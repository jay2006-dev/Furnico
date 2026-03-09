import API from "./app";

export const createOrder = async (orderData) => {
  const res = await API.post("/orders", orderData);
  return res.data;
};
