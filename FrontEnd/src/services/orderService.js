import API from "./app";

export const createOrder = async (orderData) => {
  const res = await API.post("/orders", orderData);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await API.get("/orders/myorders");
  return res.data;
};

export const getOrdersById = async (id) => {
  const res = await API.get(`/orders/${id}`);
  return res.data;
};
