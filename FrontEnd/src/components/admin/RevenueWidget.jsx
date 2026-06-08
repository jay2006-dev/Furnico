import { useEffect, useState } from "react";
import adminService from "../../services/adminService";

const RevenueWidget = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    todayRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
    // Set up polling to refresh data every 5 seconds
    const interval = setInterval(fetchRevenueData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRevenueData = async () => {
    try {
      const data = await adminService.getRevenueStats();
      setRevenueData(data);
    } catch (error) {
      console.error("Failed to fetch revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-sm font-semibold text-blue-100 uppercase">Total Revenue</h3>
        <p className="text-3xl font-bold mt-2">${typeof revenueData.totalRevenue === "number" ? revenueData.totalRevenue.toFixed(2) : revenueData.totalRevenue || "0.00"}</p>
        <p className="text-xs text-blue-100 mt-2">All time</p>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-sm font-semibold text-green-100 uppercase">Total Orders</h3>
        <p className="text-3xl font-bold mt-2">{revenueData.totalOrders || 0}</p>
        <p className="text-xs text-green-100 mt-2">Completed</p>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-sm font-semibold text-purple-100 uppercase">Avg Order Value</h3>
        <p className="text-3xl font-bold mt-2">${revenueData.avgOrderValue || "0.00"}</p>
        <p className="text-xs text-purple-100 mt-2">Per order</p>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-sm font-semibold text-orange-100 uppercase">Today's Revenue</h3>
        <p className="text-3xl font-bold mt-2">${typeof revenueData.todayRevenue === "number" ? revenueData.todayRevenue.toFixed(2) : revenueData.todayRevenue || "0.00"}</p>
        <p className="text-xs text-orange-100 mt-2">Today</p>
      </div>
    </div>
  );
};

export default RevenueWidget;
