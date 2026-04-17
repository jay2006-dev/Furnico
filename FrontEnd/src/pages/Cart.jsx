import { useContext } from "react";
import CartContext from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-white pt-40 px-6 flex flex-col items-center text-center">
        <h2 className="font-serif text-3xl mb-4 text-luxury-black">Your Cart is Empty</h2>
        <p className="font-sans text-luxury-gray font-light mb-8 max-w-md">
          Discover our curated collection of luxury furniture pieces to elevate your space.
        </p>
        <Link to="/products">
          <Button variant="primary">Explore Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl mb-12 text-luxury-black">Your Cart ({totalItems})</h1>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items List */}
          <div className="flex-1 flex flex-col gap-8">
            {cartItems.map((item, index) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 pb-8 border-b border-neutral-200"
              >
                <Link to={`/products/${item._id}`} className="w-32 aspect-square bg-luxury-cream shrink-0">
                  <img 
                    src={item.images?.[0] || '/placeholder-furniture.jpg'} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </Link>
                
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <Link to={`/products/${item._id}`}>
                      <h3 className="font-sans font-medium text-lg text-luxury-black tracking-wide">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="font-serif text-lg text-luxury-black">
                      ${item.price?.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex items-center gap-4 border border-neutral-300 px-3 py-1">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="text-neutral-500 hover:text-luxury-black transition-colors p-1"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="font-sans text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="text-neutral-500 hover:text-luxury-black transition-colors p-1"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-neutral-400 hover:text-red-500 transition-colors uppercase tracking-widest text-xs flex items-center gap-2"
                    >
                      <FiTrash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-neutral-50 p-8 border border-neutral-200 flex flex-col gap-6 sticky top-32">
              <h2 className="font-serif text-2xl border-b border-neutral-200 pb-4">Order Summary</h2>
              
              <div className="flex flex-col gap-4 font-sans font-light text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="uppercase tracking-widest text-xs">Complimentary</span>
                </div>
              </div>
              
              <div className="flex justify-between font-serif text-xl pt-4 border-t border-neutral-200">
                <span>Total</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              
              <Link to="/checkout" className="w-full mt-4">
                <Button variant="primary" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
