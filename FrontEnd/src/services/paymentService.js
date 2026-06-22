import API from "./app";

export const createPaymentIntent = async (orderId) => {
  console.log("Sending payment request for order:", orderId);
  const { data } = await API.post("/payment/create-payment-intent", {
    orderId,
  });

  return data;
};
