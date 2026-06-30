import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, getProductById } from "../services/productService";
import CartContext from "../context/CartContext";
import ImageGallery from "../components/ui/ImageGallery";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, cartItems } = useContext(CartContext);
  const isProductInCart = cartItems.some((item) => item._id === product?._id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsData, productData] = await Promise.all([
          getProducts(),
          getProductById(id),
        ]);

        setProducts(productsData.products || productsData);
        setProduct(productData);
      } catch (err) {
        setError("Failed to fetch product");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const recommendedProducts = useMemo(() => {
    if (!product) return [];

    return products.filter((p) => p._id !== product._id).slice(0, 4);
  }, [products, product]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-white">
        <div className="w-8 h-8 border-t-2 border-luxury-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-white gap-4">
        <h2 className="font-serif text-3xl">{error || "Product Not Found"}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Side: Gallery */}
        <div className="flex-1 lg:w-3/5">
          <ImageGallery images={product.images} />
        </div>

        {/* Right Side: Details (Sticky) */}
        <div className="flex-1 lg:w-2/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sticky top-32 flex flex-col gap-8"
          >
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 hover:text-luxury-black transition"
            >
              <span className="text-sm">←</span> Back
            </button>
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-neutral-200 pb-8">
              <h1 className="font-serif text-4xl leading-tight text-luxury-black">
                {product.name}
              </h1>
              <p className="font-sans text-2xl text-luxury-gray font-light">
                ${product.price?.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-luxury-black">
                Details
              </h3>
              <p className="font-sans text-neutral-600 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-6 mt-auto">
              <p className="font-sans text-sm text-neutral-500 font-light">
                Availability: {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <Button
                variant="primary"
                className="w-full py-4 text-sm"
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
              >
                {product.stock <= 0 ? "Out of Stock" : isProductInCart ? "Added to Cart" : "Add to Cart"}
              </Button>
              <p className="font-sans text-xs text-neutral-400 font-light text-center mt-2">
                Complimentary white-glove delivery on all orders.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Recommended Section (OUTSIDE flex but INSIDE root) */}
      {recommendedProducts.length > 0 && (
        <section className="border-t border-neutral-200 mt-24 pt-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl mb-8 text-luxury-black">
              You may also like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {recommendedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
