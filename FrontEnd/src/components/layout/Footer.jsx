import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-luxury-black text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-serif text-3xl mb-6 tracking-wide">FURNICO.</h2>
          <p className="font-sans text-neutral-400 max-w-sm font-light leading-relaxed">
            Curating the finest luxury furniture pieces from renowned artisans across Italy and the United States.
          </p>
        </div>
        
        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-widest mb-6">Explore</h3>
          <ul className="flex flex-col gap-4 font-light text-neutral-400">
            <li><Link to="/products" className="hover:text-white transition-colors duration-300">Collections</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors duration-300">Our Story</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors duration-300">Journal</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-widest mb-6">Assistance</h3>
          <ul className="flex flex-col gap-4 font-light text-neutral-400">
            <li><Link to="#" className="hover:text-white transition-colors duration-300">Contact</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors duration-300">Shipping & Returns</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors duration-300">Care Guide</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-neutral-500 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Furnico. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-white transition-colors duration-300">Instagram</Link>
          <Link to="#" className="hover:text-white transition-colors duration-300">Pinterest</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
