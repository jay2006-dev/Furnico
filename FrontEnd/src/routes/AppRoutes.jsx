import { Routes, Route } from "react-router-dom";
import ProductList from "../pages/ProductList";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Navbar from "../components/layout/Navbar";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:id" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
