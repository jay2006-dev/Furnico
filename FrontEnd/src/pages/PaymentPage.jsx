import { useLocation, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const { state } = useLocation();


  if (!state?.clientSecret) {
    return <Navigate to="/checkout" replace />;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: state.clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            borderRadius: "10px",
            spacingUnit: "4px",
          },
        },
      }}
    >
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full max-w-3xl">
          <CheckoutForm orderId={state.orderId} />
        </div>
      </div>
    </Elements>
  );
}
