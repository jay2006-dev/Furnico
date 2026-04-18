import useCart from "../../hooks/useCart";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { FiShoppingBag, FiUser, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Left Links - hidden on login page */}
        {!isLoginPage && (
          <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-widest">
            <Link to="/products" className="hover:text-neutral-500 transition-colors duration-300">Collections</Link>
            <Link to="/our-story" className="hover:text-neutral-500 transition-colors duration-300">Our Story</Link>
            <Link to="/my-orders" className="hover:text-neutral-500 transition-colors duration-300">Orders</Link>
          </div>
        )}

        {/* Center Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-3xl tracking-widest text-luxury-black">
          FURNICO
        </Link>

        {/* Right Icons - hidden on login page */}
        {!isLoginPage && (
          <div className="flex gap-6 items-center text-luxury-black">
            {userInfo ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 hover:text-neutral-500 transition-colors duration-300">
                  <FiUser size={20} className="md:hidden" />
                  <span className="hidden md:block text-xs font-medium uppercase tracking-widest">{userInfo.name}</span>
                </Link>
                <button onClick={logout} className="hover:text-neutral-500 transition-colors duration-300" title="Logout">
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-neutral-500 transition-colors duration-300">
                <FiUser size={20} />
              </Link>
            )}
            
            <Link to="/cart" className="relative hover:text-neutral-500 transition-colors duration-300">
              <FiShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
