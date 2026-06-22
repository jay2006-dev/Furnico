import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const orderId = new URLSearchParams(window.location.search).get("orderId");

  return (
    <div className="min-h-screen bg-luxury-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center border border-red-100 bg-white p-12 shadow-sm">
        <div className="text-6xl mb-6">❌</div>

        <h1 className="font-serif text-4xl text-luxury-black mb-4">
          Payment Failed
        </h1>

        <p className="text-neutral-600 mb-8">
          We couldn't process your payment. Please check your card details and
          try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => navigate(orderId ? `/orders/${orderId}` : "/checkout")}
          >
            Try Again
          </Button>

          <Button variant="secondary" onClick={() => navigate("/cart")}>
            Back to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
