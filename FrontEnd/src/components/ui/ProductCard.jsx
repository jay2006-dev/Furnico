import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col gap-4 cursor-pointer"
    >
      <Link to={`/products/${product._id}`} className="overflow-hidden bg-luxury-cream aspect-[4/5] relative">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={product.images?.[0] || '/placeholder-furniture.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Minimal hover overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      
      <div className="flex flex-col gap-1 px-1">
        {product.category && (
          <p className="font-sans text-[10px] uppercase tracking-widest text-luxury-gray">
            {product.category?.name || product.category}
          </p>
        )}
        <Link to={`/products/${product._id}`}>
          <h3 className="font-sans text-sm font-medium tracking-wide text-luxury-black group-hover:text-neutral-500 transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="font-serif text-lg text-luxury-gray">
          ${product.price?.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
