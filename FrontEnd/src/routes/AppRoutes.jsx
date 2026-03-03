import { Routes, Route } from "react-router-dom";
import ProductList from "../pages/ProductList";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Navbar from "../components/layout/Navbar";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
