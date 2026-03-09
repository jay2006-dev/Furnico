import { Routes, Route } from "react-router-dom";
import ProductList from "../pages/ProductList";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Navbar from "../components/layout/Navbar";
import Login from "../pages/Login";
import Cart from "../pages/Cart";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
