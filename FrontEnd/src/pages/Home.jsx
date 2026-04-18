import React from 'react';
import LuxuryHero from '../components/home/LuxuryHero';
import ProductCarousel from '../components/home/ProductCarousel';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home = () => {
  return (
    <div className="bg-luxury-white min-h-screen">
      <LuxuryHero />

      {/* Product Carousel */}
      <ProductCarousel />

      {/* Editorial Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1"
        >
          <img 
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Craftsmanship" 
            className="w-full aspect-[3/4] object-cover"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 flex flex-col gap-8"
        >
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            The Art of <br /> Italian Craftsmanship
          </h2>
          <p className="font-sans text-luxury-gray leading-relaxed font-light">
            Every piece in our collection tells a story of heritage and dedication. From the initial sketch to the final polish, our artisans pour generations of expertise into creating furniture that transcends trends. We believe that true luxury lies in the details—the perfectly turned leg, the seamless joint, the flawless finish.
          </p>
          <div>
            <Link to="/products">
              <Button variant="secondary">View Collection</Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
