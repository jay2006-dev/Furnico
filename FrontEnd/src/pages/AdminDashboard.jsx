import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RevenueWidget from "../components/admin/RevenueWidget";
import CommerceWidget from "../components/admin/CommerceWidget";
import ProductsWidget from "../components/admin/ProductsWidget";
import EstimationChart from "../components/admin/EstimationChart";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (userInfo && userInfo?.role === "admin") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    } else if (userInfo && userInfo?.role !== "admin") {
      // User is logged in but not admin
      setIsLoading(false);
    } else {
      // No user info yet, wait a moment then check again
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [userInfo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userInfo || userInfo?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {userInfo?.name}</p>
        </div>

        {/* Revenue Stats */}
        <div className="mb-8">
          <RevenueWidget />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <EstimationChart />
        </div>

        {/* Orders Section */}
        <div className="mb-8">
          <CommerceWidget />
        </div>

        {/* Products Section */}
        <div>
          <ProductsWidget />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
