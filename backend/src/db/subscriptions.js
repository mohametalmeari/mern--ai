import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  customer: { type: String },
  priceId: { type: String },
  expires: { type: Date, required: false },
});

const Subscription = mongoose.model("Subscription", Schema);

export const getSubscriptionByUserId = (userId) =>
  Subscription.findOne({ userId });

export const createSubscription = (data) => Subscription.create(data);

export const updateSubscriptionById = (_id, data) =>
  Subscription.updateOne({ _id }, data);
