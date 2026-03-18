import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div>
        <h2>My Orders</h2>
        <p>No orders found</p>
      </div>
    );
  }

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id}>
          <Link to={`/orders/${order._id}`}>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: $ {order.totalPrice}</p>
            <p>Status: {order.status}</p>
          </Link>

          <h4>Items</h4>

          {order.orderItems?.map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
              <p>Qty: {item.qty}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}

          <hr />
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
