import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const stats = [
  { value: "1987", label: "Year Founded" },
  { value: "30+", label: "Countries Served" },
  { value: "12,000+", label: "Pieces Crafted" },
  { value: "98%", label: "Customer Satisfaction" },
];

const values = [
  {
    title: "Artisan Craftsmanship",
    body:
      "Every Furnico piece is handcrafted by master artisans who have spent decades perfecting their craft. We reject the assembly line. We embrace the human hand.",
  },
  {
    title: "Sustainable Materials",
    body:
      "We source only FSC-certified solid woods, natural stones, and eco-friendly leathers — materials that last a lifetime and leave a lighter footprint on the planet.",
  },
  {
    title: "Timeless Design",
    body:
      "Trends fade. Our design philosophy doesn't. We draw on Italian Modernism and Scandinavian minimalism to create furniture that remains relevant across generations.",
  },
  {
    title: "White-Glove Service",
    body:
      "From the first consultation to the final placement in your home, our concierge team ensures a seamless, unhurried experience worthy of the investment you are making.",
  },
];

const OurStory = () => {
  return (
    <div className="bg-luxury-white min-h-screen">

      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80"
          alt="Furnico Atelier"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4"
          >
            Est. 1987 · Milano, Italy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-5xl md:text-7xl text-white leading-tight max-w-2xl"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-serif text-2xl md:text-3xl text-luxury-black leading-relaxed font-light">
            "We did not set out to sell furniture. We set out to make the places
            people call home feel worthy of the lives lived inside them."
          </p>
          <p className="font-sans text-sm text-luxury-gray mt-6 tracking-widest uppercase">
            — Marco Ferretti, Founder
          </p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="border-t border-b border-neutral-200 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className="font-serif text-4xl md:text-5xl text-luxury-black mb-2">
                {stat.value}
              </p>
              <p className="font-sans text-xs uppercase tracking-widest text-luxury-gray">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Origin Story — Text + Image */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex-1 flex flex-col gap-8"
        >
          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-luxury-gray mb-4">
              Where It Began
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-black leading-tight mb-6">
              Born in a Milanese
              <br /> Atelier
            </h2>
          </div>
          <p className="font-sans text-neutral-600 leading-relaxed font-light">
            In 1987, Marco Ferretti — a carpenter's son from Brianza — opened a
            small atelier on Via Montenapoleone in Milan. Armed with hand tools,
            inherited sketches, and an uncompromising belief that furniture
            should outlast the people who own it, he produced his first
            collection of twelve chairs. All twelve sold within a week.
          </p>
          <p className="font-sans text-neutral-600 leading-relaxed font-light">
            Word spread quietly among Milan's design circles. Within three
            years, Furnico had furnished the private residences of two Italian
            senators, a celebrated opera director, and a Monaco penthouse. The
            secret was never advertising. It was always the work itself.
          </p>
          <p className="font-sans text-neutral-600 leading-relaxed font-light">
            Today, Furnico operates from a converted 19th-century factory in the
            Brianza district — the same region that has supplied Italy's finest
            furniture makers for over two centuries. Every piece still begins
            with a pencil sketch. Every joint is still checked by hand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1"
        >
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Furnico craftsmanship"
            className="w-full aspect-[4/5] object-cover"
          />
          <p className="font-sans text-xs text-neutral-400 mt-3 tracking-wide">
            The Brianza Atelier, Lombardy · Est. 1987
          </p>
        </motion.div>
      </section>

      {/* Craftsmanship Image Break */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80"
          alt="Furnico workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-3xl md:text-5xl text-white text-center max-w-3xl px-6 leading-tight"
          >
            "A piece of furniture should feel like it has always belonged there."
          </motion.p>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="font-sans text-xs uppercase tracking-widest text-luxury-gray mb-4">
            What Drives Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-black">
            Our Philosophy
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="border-t border-neutral-200 pt-8"
            >
              <h3 className="font-serif text-2xl text-luxury-black mb-4">
                {v.title}
              </h3>
              <p className="font-sans text-neutral-600 leading-relaxed font-light">
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-luxury-black text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
            Experience the Furnico Difference
          </h2>
          <p className="font-sans text-white/60 font-light mb-10 leading-relaxed">
            Every piece we make carries the weight of our history and the
            promise of our craft. Browse the collection and find the piece that
            will define your space for generations.
          </p>
          <Link to="/products">
            <button className="font-sans text-xs uppercase tracking-widest border border-white text-white px-10 py-4 hover:bg-white hover:text-luxury-black transition-all duration-300">
              Explore the Collection
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default OurStory;
