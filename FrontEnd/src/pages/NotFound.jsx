import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl md:text-9xl font-serif text-neutral-900"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-3xl md:text-4xl font-serif text-neutral-800"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-neutral-600 leading-relaxed"
        >
          The page you're looking for seems to have been moved, removed, or
          never existed. Let's help you find your way back.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="px-8 py-3 bg-black text-white uppercase tracking-widest text-sm hover:bg-neutral-800 transition"
            replace
          >
            Return Home
          </Link>

          <Link
            to="/products"
            replace
            className="px-8 py-3 border border-black text-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition"
          >
            Browse Collection
          </Link>
        </motion.div>

        <div className="mt-16 w-32 h-[1px] bg-neutral-300 mx-auto" />
      </div>
    </div>
  );
};

export default NotFound;
