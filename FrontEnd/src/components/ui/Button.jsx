import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = "px-8 py-3 text-sm font-medium tracking-widest uppercase transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-luxury-black text-white hover:bg-neutral-800",
    secondary: "bg-transparent text-luxury-black border border-luxury-black hover:bg-luxury-black hover:text-white",
    ghost: "bg-transparent text-luxury-black hover:text-neutral-500",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
