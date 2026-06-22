import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ orderId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?orderId=${orderId}`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      setTimeout(() => {
        window.location.href = `${window.location.origin}/payment-failed?orderId=${orderId}`;
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg space-y-6"
    >
      <div className="w-full overflow-hidden">
        <PaymentElement />
      </div>

      {message && (
        <div className="text-red-500 text-sm break-words">{message}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="  w-full  bg-black  text-white  py-3  sm:py-4  rounded-lg  font-medium  transition-all  duration-300  hover:opacity-90  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
