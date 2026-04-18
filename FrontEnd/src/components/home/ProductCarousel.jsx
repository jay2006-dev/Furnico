import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getProducts } from "../../services/productService";

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const trackRef = useRef(null);

  const VISIBLE = 4; // cards visible at once

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.products || data || []))
      .catch(() => {});
  }, []);

  const maxIndex = Math.max(0, products.length - VISIBLE);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  // Drag / swipe support
  const onDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches ? e.touches[0].clientX : e.clientX);
  };
  const onDragEnd = (e) => {
    if (!isDragging) return;
    const end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart - end;
    if (diff > 60) next();
    else if (diff < -60) prev();
    setIsDragging(false);
  };

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-luxury-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-xs uppercase tracking-widest text-luxury-gray mb-3">
              Curated for You
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-black leading-tight">
              Featured <br className="hidden md:block" /> Collection
            </h2>
          </motion.div>

          {/* Arrow Controls */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-12 h-12 border border-neutral-300 flex items-center justify-center text-luxury-black hover:bg-luxury-black hover:text-white hover:border-luxury-black disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="w-12 h-12 border border-neutral-300 flex items-center justify-center text-luxury-black hover:bg-luxury-black hover:text-white hover:border-luxury-black disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
        >
          <motion.div
            className="flex gap-6"
            animate={{ x: `calc(-${currentIndex} * (25% + 6px))` }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {products.map((product, i) => (
              <div
                key={product._id}
                className="min-w-[calc(25%-18px)] flex-shrink-0 group"
              >
                <Link to={`/products/${product._id}`} className="block">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-luxury-cream aspect-[4/5] mb-4">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      src={product.images?.[0] || "/placeholder-furniture.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                    {/* Quick view pill */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="bg-white text-luxury-black text-[10px] uppercase tracking-widest px-5 py-2 font-sans font-medium shadow-sm">
                        View Details
                      </span>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="px-1">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-luxury-gray mb-1">
                      {product.category || "Furniture"}
                    </p>
                    <h3 className="font-sans text-sm font-medium tracking-wide text-luxury-black group-hover:text-neutral-500 transition-colors duration-300 line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="font-serif text-lg text-luxury-black">
                      ${product.price?.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? "w-8 h-1.5 bg-luxury-black"
                  : "w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="font-sans text-xs uppercase tracking-widest text-luxury-black border-b border-luxury-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
