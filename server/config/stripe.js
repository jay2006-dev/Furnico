const Stripe = require("stripe");

const apiKey = process.env.STRIPE_SECRET_KEY || "dummy_key_to_prevent_startup_crash";
const stripe = new Stripe(apiKey);

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("WARNING: STRIPE_SECRET_KEY environment variable is not defined.");
}

module.exports = stripe;
