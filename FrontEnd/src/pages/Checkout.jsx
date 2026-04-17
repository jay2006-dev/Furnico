import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderError, setOrderError] = useState("");
  const [placing, setPlacing] = useState(false);
  
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const placeOrder = async (e) => {
    e.preventDefault();
    setOrderError("");
    setPlacing(true);
    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        qty: item.quantity,
      })),
      shippingAddress: {
        address: address.street,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      },
      totalPrice,
    };

    try {
      const order = await createOrder(orderData);
      clearCart();
      navigate(`/order/${order._id}`);
    } catch (error) {
      setOrderError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-white pt-40 px-6 flex flex-col items-center text-center">
        <h2 className="font-serif text-3xl mb-4">Cart is Empty</h2>
        <Link to="/products"><Button variant="primary">Return to Shop</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h1 className="font-serif text-4xl mb-10 text-luxury-black">Checkout</h1>
          <form onSubmit={placeOrder} className="flex flex-col gap-8">
            <div>
              <h3 className="font-sans text-lg font-medium mb-6 tracking-wide">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">Street Address</label>
                  <input
                    type="text" required
                    className="border-b border-neutral-300 bg-transparent py-2 px-1 focus:outline-none focus:border-luxury-black transition-colors"
                    value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">City</label>
                  <input
                    type="text" required
                    className="border-b border-neutral-300 bg-transparent py-2 px-1 focus:outline-none focus:border-luxury-black transition-colors"
                    value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">Postal Code</label>
                  <input
                    type="text" required
                    className="border-b border-neutral-300 bg-transparent py-2 px-1 focus:outline-none focus:border-luxury-black transition-colors"
                    value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                  />
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                  <label className="font-sans text-xs uppercase tracking-widest text-neutral-500">Country</label>
                  <input
                    type="text" required
                    className="border-b border-neutral-300 bg-transparent py-2 px-1 focus:outline-none focus:border-luxury-black transition-colors"
                    value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            {orderError && (
              <p className="text-red-600 font-sans text-sm border border-red-200 bg-red-50 p-4">{orderError}</p>
            )}
            <Button type="submit" variant="primary" className="w-full md:w-auto self-start mt-4" disabled={placing}>
              {placing ? "Placing Order..." : "Confirm & Place Order"}
            </Button>
          </form>
        </motion.div>

        {/* Right Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-96 shrink-0"
        >
          <div className="bg-neutral-50 p-8 border border-neutral-200 sticky top-32">
            <h2 className="font-serif text-2xl border-b border-neutral-200 pb-4 mb-6">Order Summary</h2>
            <div className="flex flex-col gap-4 mb-8">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between items-center text-sm font-sans">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-luxury-cream shrink-0">
                      <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-light truncate w-32">{item.name} <span className="text-neutral-400">x{item.quantity}</span></span>
                  </div>
                  <span className="font-light">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-serif text-xl pt-4 border-t border-neutral-200">
              <span>Total</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Checkout;
