import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const OrderSuccess = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-luxury-white pt-40 px-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <div className="w-20 h-20 border border-luxury-black rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl text-luxury-black mb-6">Thank You.</h1>
        <p className="font-sans text-luxury-gray font-light text-lg mb-4">
          Your order has been placed successfully and is being prepared for complimentary white-glove delivery.
        </p>
        <p className="font-sans text-sm tracking-widest uppercase text-neutral-500 mb-12">
          Order Reference: {id}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={`/orders/${id}`}>
            <Button variant="secondary" className="w-full sm:w-auto">View Order Details</Button>
          </Link>
          <Link to="/products">
            <Button variant="primary" className="w-full sm:w-auto">Continue Shopping</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
