import useCart from "../../hooks/useCart";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav
      style={{ display: "flex", gap: "20px", borderBottom: "1px solid #ccc" }}
    >
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart"> Cart ({totalItems})</Link>
      {userInfo ? (
        <>
          <span>Welcome {userInfo.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
