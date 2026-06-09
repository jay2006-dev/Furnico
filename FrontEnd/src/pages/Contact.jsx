import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-luxury-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* LEFT - BRAND SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="font-serif text-5xl text-luxury-black leading-tight mb-6">
            Let’s connect.
          </h1>

          <p className="font-sans text-neutral-500 text-base leading-relaxed max-w-md">
            Whether you have a question about a piece, your order, or simply
            want to share feedback — we’d love to hear from you.
          </p>

          <div className="mt-12 space-y-6 text-sm font-sans text-neutral-600">
            <div>
              <p className="uppercase tracking-widest text-xs text-neutral-400">
                Email
              </p>
              <p className="text-luxury-black">support@furnico.com</p>
            </div>

            <div>
              <p className="uppercase tracking-widest text-xs text-neutral-400">
                Response
              </p>
              <p className="text-luxury-black">Within 24–48 hours</p>
            </div>

            <div>
              <p className="uppercase tracking-widest text-xs text-neutral-400">
                Location
              </p>
              <p className="text-luxury-black">India</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT - FORM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-50 border border-neutral-200 p-10"
        >
          <form className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-luxury-black"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">
                Email
              </label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-luxury-black"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400">
                Message
              </label>
              <textarea
                rows="6"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-transparent border border-neutral-300 p-4 focus:outline-none focus:border-luxury-black"
              />
            </div>

            <Button variant="primary" className="w-full">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
