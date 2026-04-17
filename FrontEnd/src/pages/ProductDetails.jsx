import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProductById } from "../services/productService";
import CartContext from "../context/CartContext";
import ImageGallery from "../components/ui/ImageGallery";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
              <p className="font-sans text-xs text-neutral-400 font-light text-center mt-2">
                Complimentary white-glove delivery on all orders.
              </p>
            </div>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetails;
