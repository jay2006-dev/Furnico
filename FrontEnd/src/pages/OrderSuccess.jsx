import { useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Ordered Placed Successfully...!</h2>
      <p>Order ID : {id}</p>
    </div>
  );
};

export default OrderSuccess;
