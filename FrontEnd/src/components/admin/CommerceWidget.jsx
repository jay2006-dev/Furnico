import { useState } from "react";
import OrdersWidget from "./OrdersWidget";
import PaymentsWidget from "./PaymentsWidget";

const CommerceWidget = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {activeTab === "orders" ? "Recent Orders" : "Payments"}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "orders"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === "payments"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Payments
          </button>
        </div>
      </div>

      {activeTab === "orders" ? <OrdersWidget /> : <PaymentsWidget />}
    </div>
  );
};

export default CommerceWidget;
