import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrdersById } from "../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrdersById(id);
        setOrder(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [id]);
  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <p>OrderDetails</p>
      <p>
        <b> Order ID : {order._id}</b>
      </p>
      <p>
        <b>
          Date : <b> {new Date(order.createdAt).toLocaleDateString()}</b>
        </b>
      </p>
      <p>
        <b>
          Status : <b>{order.status}</b>
        </b>
      </p>
      <p>
        <b>
          Total Price : <b>${order.totalPrice}</b>
        </b>
      </p>

      <h3>Items</h3>

      {order.orderItems?.map((item) => {
        <div key={item._id}>
          <p>{item.name}</p>
          <p>Qty: {item.qty}</p>
          <p>Price: ${item.price}</p>
          <hr />
        </div>;
      })}
    </div>
  );
};

export default OrderDetails;
