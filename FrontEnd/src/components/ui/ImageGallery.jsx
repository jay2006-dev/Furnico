import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="w-full aspect-square bg-luxury-cream flex items-center justify-center">
        <span className="text-luxury-gray text-sm uppercase tracking-widest">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8 h-full">
      {/* Thumbnails (Desktop side, Mobile bottom) */}
      <div className="order-2 md:order-1 flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative aspect-[4/5] overflow-hidden shrink-0 w-20 md:w-full transition-all duration-300 ${
              currentIndex === idx ? 'ring-1 ring-luxury-black ring-offset-2' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 md:order-2 flex-1 relative aspect-[4/5] bg-luxury-cream overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            src={images[currentIndex]}
            alt={`Product View ${currentIndex}`}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageGallery;
