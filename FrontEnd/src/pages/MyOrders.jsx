import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-white">
        <div className="w-8 h-8 border-t-2 border-luxury-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-4xl mb-12 text-luxury-black">Order History</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 border border-neutral-200 bg-neutral-50">
            <p className="font-sans text-luxury-gray font-light mb-4">You have no recent orders.</p>
            <Link to="/products" className="font-sans text-xs uppercase tracking-widest text-luxury-black hover:underline underline-offset-4">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order, index) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-widest text-neutral-500">Order Placed</span>
                    <span className="font-sans font-medium text-luxury-black">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-widest text-neutral-500">Total</span>
                    <span className="font-serif text-lg text-luxury-black">${order.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-xs uppercase tracking-widest text-neutral-500">Status</span>
                    <span className="font-sans font-medium capitalize text-luxury-black">{order.status || 'Processing'}</span>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <Link to={`/orders/${order._id}`} className="font-sans text-xs uppercase tracking-widest border border-luxury-black px-4 py-2 hover:bg-luxury-black hover:text-white transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {order.orderItems?.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="font-sans text-sm text-neutral-500">x{item.qty}</span>
                        <span className="font-sans font-light text-luxury-black">{item.name}</span>
                      </div>
                      <span className="font-sans text-sm font-light text-neutral-600">${item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
