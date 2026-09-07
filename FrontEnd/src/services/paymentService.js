import API from "./app";

export const createPaymentIntent = async (orderId) => {
  const { data } = await API.post("/payment/create-payment-intent", {
    orderId,
  });

  return data;
};
