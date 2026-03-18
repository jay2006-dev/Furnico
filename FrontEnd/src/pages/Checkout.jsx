import { useContext } from "react";
import CartContext from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const placeOrder = async () => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
      })),
      shippingAddress: {
        address: "Test Street",
        city: "Hyderabad",
        postalCode: "500001",
        country: "India",
      },
      totalPrice,
    };

    const order = await createOrder(orderData);
    // setCartItems([]);
    clearCart();
    navigate(`/order/${order._id}`);
    console.log("Order Created", order);
  };
  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
