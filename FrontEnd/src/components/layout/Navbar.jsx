import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
      <Link to="/products">Products</Link>
      <Link to="/cart"> Cart ({totalItems})</Link>
    </nav>
  );
};

export default Navbar;
