import React from "react";

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const orderTime = new Date(order.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-800 p-2 rounded-full transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-xs text-gray-600 uppercase">Order ID</p>
              <p className="text-lg font-semibold text-gray-800">{order._id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase">Status</p>
              <p
                className={`text-lg font-semibold ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Shipped"
                    ? "text-purple-600"
                    : order.status === "Processing"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase">Order Date</p>
              <p className="text-sm text-gray-800">{orderDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase">Order Time</p>
              <p className="text-sm text-gray-800">{orderTime}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-600">Name:</span> {order.user?.name || "N/A"}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Email:</span> {order.user?.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Shipping Address</h3>
              <div className="text-sm space-y-1 text-gray-700">
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && <p>Phone: {order.shippingAddress.phone}</p>}
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-3 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product?.name || "Product"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Quantity: {item.qty} × ${item.price?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-semibold text-gray-800">
                  ${order.totalPrice?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-gray-800">Total Amount:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${order.totalPrice?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="pt-3 flex justify-between">
                <span className="text-sm text-gray-600">Payment Status:</span>
                <span
                  className={`text-sm font-semibold ${
                    order.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.isPaid ? "✓ Paid" : "Pending"}
                </span>
              </div>
              {order.paidAt && (
                <p className="text-xs text-gray-600">
                  Paid on: {new Date(order.paidAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
