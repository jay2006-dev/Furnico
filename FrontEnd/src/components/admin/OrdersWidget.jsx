import { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import OrderDetailsModal from "./OrderDetailsModal";

const OrdersWidget = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await adminService.getAllOrders();
      setOrders(data?.orders || data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await adminService.updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Error updating status: " + (error.message || "Unknown error"));
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Items</th>
              <th className="text-left py-2">Total</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{order._id?.slice(-8)}</td>
                  <td className="py-3">{order.user?.name || "N/A"}</td>
                  <td className="py-3">{order.orderItems?.length || 0} item(s)</td>
                  <td className="py-3">${order.totalPrice?.toFixed(2) || "0.00"}</td>
                  <td className="py-3">
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Shipped"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default OrdersWidget;
