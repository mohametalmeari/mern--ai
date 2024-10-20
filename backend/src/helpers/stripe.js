import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const return_url = `${process.env.STRIPE_RETURN_URL}?stripe=return`;
export const success_url = `${process.env.STRIPE_RETURN_URL}?stripe=success`;
export const cancel_url = `${process.env.STRIPE_RETURN_URL}?stripe=cancel`;
