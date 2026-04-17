const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");
const Category = require("./models/Category");

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();

    const categories = await Category.insertMany([
      { name: "Sofa", description: "Luxury Sofas & Lounges" },
      { name: "Chair", description: "Modern & Classic Chairs" },
      { name: "Table", description: "Dining & Coffee Tables" },
      { name: "Bed", description: "Premium Bedroom Furniture" },
      { name: "Lighting", description: "Designer Lighting & Chandeliers" },
    ]);

    const products = [
      // Sofas
      { name: "Milanese Velvet Lounge", price: 5400, category: categories[0]._id, stock: 4, images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Handcrafted in Milan, featuring deep emerald velvet and brushed brass legs.", isFeatured: true },
      { name: "Cloud Minimalist Sectional", price: 6200, category: categories[0]._id, stock: 2, images: ["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "The ultimate lounging experience, filled with pure down and upholstered in Belgian linen." },
      { name: "Modena Leather Sofa", price: 8500, category: categories[0]._id, stock: 5, images: ["https://images.unsplash.com/photo-1540574163026-643ea20d25b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Full-grain Italian leather that patinas beautifully over time.", isFeatured: true },
      { name: "Venetian Tufted Chesterfield", price: 7100, category: categories[0]._id, stock: 1, images: ["https://images.unsplash.com/photo-1550254478-ead40cc54513?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A classic silhouette reimagined with modern proportions and sumptuous mohair." },
      { name: "Oslo Bouclé Settee", price: 4200, category: categories[0]._id, stock: 6, images: ["https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Scandinavian design meets tactile comfort with premium French bouclé." },
      { name: "Florence Curved Sofa", price: 9000, category: categories[0]._id, stock: 3, images: ["https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "An architectural masterpiece with a sweeping curved back and silk-blend upholstery.", isNewArrival: true },

      // Chairs
      { name: "Barcelona Lounge Replica", price: 3200, category: categories[1]._id, stock: 8, images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A tribute to mid-century modernism, crafted with polished chrome and premium leather." },
      { name: "Elegance Dining Chair Set", price: 1800, category: categories[1]._id, stock: 12, images: ["https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Set of 2. Carved ash wood with a hand-woven rattan seat and back." },
      { name: "Copenhagen Swivel Chair", price: 2400, category: categories[1]._id, stock: 5, images: ["https://images.unsplash.com/photo-1592078615290-028cca68be97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A sculptural masterpiece that provides unparalleled ergonomic support." },
      { name: "Monarch Reading Wingback", price: 3500, category: categories[1]._id, stock: 4, images: ["https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Designed for the study or library, featuring deep tufting and nailhead trim.", isFeatured: true },
      { name: "Sapphire Velvet Armchair", price: 2100, category: categories[1]._id, stock: 7, images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A jewel-toned statement piece with slender brushed gold legs." },
      { name: "Aria Minimalist Stool", price: 850, category: categories[1]._id, stock: 15, images: ["https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Perfect for the kitchen island, featuring a seamless molded seat." },

      // Tables
      { name: "Nordic Oak Dining Table", price: 4500, category: categories[2]._id, stock: 3, images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Solid European white oak with a natural oil finish, seats up to 10.", isFeatured: true },
      { name: "Carrara Marble Coffee Table", price: 2800, category: categories[2]._id, stock: 6, images: ["https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A solid slab of Italian Carrara marble resting on a minimalist blackened steel base." },
      { name: "Onyx Console Table", price: 3100, category: categories[2]._id, stock: 4, images: ["https://images.unsplash.com/photo-1499933374294-4584851460dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Sleek and dramatic, perfect for the entryway or living space." },
      { name: "Tuscan Farmhouse Table", price: 5200, category: categories[2]._id, stock: 2, images: ["https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Reclaimed wood from Italian villas, featuring unique knots and distressing." },
      { name: "Eclipse Glass Side Table", price: 1200, category: categories[2]._id, stock: 10, images: ["https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Tempered smoked glass that creates beautiful light interactions." },
      { name: "Walnut Executive Desk", price: 6800, category: categories[2]._id, stock: 3, images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A commanding presence for the home office, featuring hidden cable management.", isNewArrival: true },

      // Beds
      { name: "Serenity Upholstered Bed", price: 5900, category: categories[3]._id, stock: 4, images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A fully upholstered frame in performance linen for the ultimate restful retreat." },
      { name: "Canopy Four-Poster Bed", price: 7400, category: categories[3]._id, stock: 2, images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Solid walnut construction with clean, architectural lines." },
      { name: "Emperor Tufted Headboard Bed", price: 6100, category: categories[3]._id, stock: 3, images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Hand-tufted detailing across an oversized headboard, wrapped in crushed velvet.", isFeatured: true },
      { name: "Zen Platform Bed", price: 4200, category: categories[3]._id, stock: 5, images: ["https://images.unsplash.com/photo-1522771731470-bea437360f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A low-profile Japanese-inspired design made from sustainable bamboo." },
      { name: "Versailles Iron Bed", price: 3800, category: categories[3]._id, stock: 6, images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Forged by hand, this iron frame features delicate scrollwork and a hand-rubbed bronze finish." },
      { name: "Cloud Floating Bed", price: 8200, category: categories[3]._id, stock: 2, images: ["https://images.unsplash.com/photo-1531835551805-16d8e4f4abbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "An engineering marvel that appears to hover above the floor, with integrated LED lighting.", isNewArrival: true },

      // Lighting
      { name: "Aura Brass Pendant", price: 1400, category: categories[4]._id, stock: 12, images: ["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A minimalist dome pendant crafted from solid spun brass." },
      { name: "Crystal Cascade Chandelier", price: 8900, category: categories[4]._id, stock: 2, images: ["https://images.unsplash.com/photo-1565814329452-e1efa11c5e8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Hundreds of hand-cut Bohemian crystals suspended from a polished nickel frame.", isFeatured: true },
      { name: "Lumina Floor Lamp", price: 1850, category: categories[4]._id, stock: 8, images: ["https://images.unsplash.com/photo-1507652313519-d4e9174996cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "An arcing floor lamp with an alabaster shade that casts a warm, ambient glow." },
      { name: "Geo Linear Suspension", price: 2600, category: categories[4]._id, stock: 5, images: ["https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A continuous ribbon of LED light encased in matte black aluminum, perfect for dining tables." },
      { name: "Opal Glass Table Lamp", price: 950, category: categories[4]._id, stock: 15, images: ["https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "A mouth-blown opal glass sphere resting on a solid travertine base." },
      { name: "Stellar Sconce Set", price: 1100, category: categories[4]._id, stock: 10, images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"], description: "Set of 2. Mid-century inspired starburst sconces in antique brass.", isNewArrival: true },
    ];

    await Product.insertMany(products);

    console.log("Data Imported successfully with 30 luxury products!");
    process.exit();
  } catch (err) {
    console.error("Error with data import:", err);
    process.exit(1);
  }
};

importData();
