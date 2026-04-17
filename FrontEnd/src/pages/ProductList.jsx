import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ui/ProductCard";
import { motion } from "framer-motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Assume API returns either array of products or { products: [...] }
        setProducts(data.products || data);
      } catch (err) {
        setError("Failed to fetch products");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-white pt-20">
        <div className="w-8 h-8 border-t-2 border-luxury-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-white pt-20">
        <h2 className="font-serif text-3xl text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-neutral-200 pb-8"
        >
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-luxury-black mb-4">Our Collections</h1>
            <p className="font-sans text-luxury-gray font-light max-w-lg">
              Explore our meticulously curated selection of premium furniture, blending timeless design with masterful craftsmanship.
            </p>
          </div>
          <div className="font-sans text-xs uppercase tracking-widest text-neutral-400">
            {products.length} Products Available
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index % 4} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
