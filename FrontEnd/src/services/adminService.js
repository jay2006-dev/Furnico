import API from "../services/app";

const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await API.get("/admin/stats");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await API.get("/admin/orders");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get all products
  getAllProducts: async () => {
    try {
      const response = await API.get("/admin/products");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const response = await API.put(`/admin/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const response = await API.delete(`/admin/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    try {
      const response = await API.put(`/admin/orders/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get revenue stats
  getRevenueStats: async () => {
    try {
      const response = await API.get("/admin/revenue");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default adminService;
