import Stripe from "stripe";

// Payments are paused. A placeholder key lets the site build without a real one.
export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder"
);
