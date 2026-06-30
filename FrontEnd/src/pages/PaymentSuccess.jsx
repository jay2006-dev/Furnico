import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";
import Button from "../components/ui/Button";

const PaymentSuccess = () => {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const orderId = new URLSearchParams(window.location.search).get("orderId");

  useEffect(() => {
    clearCart();

    // Prevent going back to checkout page
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [clearCart, navigate]);

  return (
    <div className="min-h-screen bg-luxury-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center border border-neutral-200 bg-white p-12 shadow-sm">
        <div className="text-6xl mb-6">🎉</div>

        <h1 className="font-serif text-4xl text-luxury-black mb-4">
          Payment Successful
        </h1>

        <p className="text-neutral-600 mb-8">
          Thank you for shopping with Furnico. Your order has been placed
          successfully and is being processed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={() => navigate("/products")}>
            Continue Shopping
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate(`/order/${orderId}`)}
          >
            View Orders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
