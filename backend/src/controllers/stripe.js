import {
  createSubscription,
  getSubscriptionByUserId,
  updateSubscriptionById,
} from "../db/subscriptions";
import { getUserById } from "../db/users";
import { cancel_url, return_url, stripe, success_url } from "../helpers";

export const Subscribe = async (req, res) => {
  try {
    const user = req.identity;
    const userId = user._id.toString();

    const { customer } = (await getSubscriptionByUserId(userId)) || {};

    if (customer) {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url,
      });

      return res.status(200).json({ url });
    }

    const { url } = await stripe.checkout.sessions.create({
      success_url,
      cancel_url,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Genius Pro",
              description: "Unlimited access to all features",
            },
            unit_amount: 2000,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      metadata: { userId }, // Pass data to webhook
    });

    return res.status(200).json({ url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};

export const Webhook = async (req, res) => {
  try {
    const { body } = req;
    const sig = req.headers["stripe-signature"];
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    const event = stripe.webhooks.constructEvent(body, sig, secret);

    const { metadata, subscription } = event.data.object;

    if (!subscription) return;

    const { userId } = metadata;

    const user = await getUserById(userId);

    const { id, customer, items, current_period_end } =
      await stripe.subscriptions.retrieve(subscription);

    console.log("trace", event.type);

    switch (event.type) {
      case "checkout.session.completed":
        await createSubscription({
          userId,
          _id: id,
          customer,
          priceId: items.data[0].price.id,
          expires: new Date(current_period_end * 1000),
        });

        break;

      case "invoice.payment_succeeded":
        await updateSubscriptionById(id, {
          priceId: items.data[0].price.id,
          expires: new Date(current_period_end * 1000),
        });

        break;
    }

    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal error" });
  }
};
