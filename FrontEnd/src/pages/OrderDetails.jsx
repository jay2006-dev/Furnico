import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrdersById } from "../services/orderService";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrdersById(id);
        if (data && data.message && !data._id) {
          // API returned an error object
          setError(data.message);
        } else {
          setOrder(data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-white">
        <div className="w-8 h-8 border-t-2 border-luxury-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !order) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-white gap-6">
      <p className="font-serif text-2xl text-luxury-black">{error || "Order Not Found"}</p>
      <Link to="/my-orders">
        <Button variant="secondary">Back to My Orders</Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-200 pb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-luxury-black mb-2">Order Details</h1>
            <p className="font-sans text-sm tracking-widest uppercase text-neutral-500">
              Reference: {order._id}
            </p>
          </div>
          <Link to="/my-orders">
            <Button variant="secondary" className="px-6 py-2 text-xs">Back to Orders</Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Order Info */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="bg-neutral-50 p-8 border border-neutral-200">
              <h3 className="font-serif text-xl mb-6 text-luxury-black">Summary</h3>
              <div className="flex flex-col gap-4 font-sans font-light text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Date Placed</span>
                  <span className="text-luxury-black font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-luxury-black capitalize font-medium">{order.status || 'Processing'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-luxury-black font-medium">${order.totalPrice?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-neutral-200 mt-2 font-serif text-lg">
                  <span className="text-luxury-black">Total</span>
                  <span className="text-luxury-black">${order.totalPrice?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 p-8 border border-neutral-200">
              <h3 className="font-serif text-xl mb-6 text-luxury-black">Shipping Address</h3>
              {order.shippingAddress ? (
                <div className="font-sans font-light text-sm text-neutral-600 flex flex-col gap-1">
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              ) : (
                <p className="font-sans font-light text-sm text-neutral-600">Address not provided.</p>
              )}
            </div>
          </div>

          {/* Items List */}
          <div className="flex-[1.5] flex flex-col gap-6">
            <h3 className="font-serif text-2xl text-luxury-black mb-2">Items Ordered</h3>
            {order.orderItems?.map((item, index) => (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-6 pb-6 border-b border-neutral-100"
              >
                <div className="w-20 h-20 bg-luxury-cream shrink-0">
                  {/* Ideally image would be saved in order item, using placeholder if not */}
                  <img src={item.product?.images?.[0] || '/placeholder-furniture.jpg'} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h4 className="font-sans font-medium text-luxury-black tracking-wide">{item.name}</h4>
                  <p className="font-sans text-xs uppercase tracking-widest text-neutral-500">Qty: {item.qty}</p>
                </div>
                <p className="font-serif text-lg text-luxury-black">${(item.price * item.qty).toLocaleString()}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
