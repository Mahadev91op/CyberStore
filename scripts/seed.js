// scripts/seed.js
const mongoose = require('mongoose');

// 1. अपना MongoDB URI यहाँ डालें (या .env फाइल से लोड करें)
// नोट: टेस्टिंग के लिए आप इसे हार्डकोड कर सकते हैं या dotenv यूज़ करें
const MONGODB_URI = "mongodb+srv://mahadevtanti191_db_user:maha123@cluster0.60yqudl.mongodb.net/"; 

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing inside the script!");
  process.exit(1);
}

// 2. Product Schema (वही जो models/Product.js में था)
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  discountPrice: Number,
  images: [String],
  category: String,
  brand: String,
  stock: { type: Number, default: 10 },
  isFeatured: { type: Boolean, default: false },
  specs: { type: Map, of: mongoose.Schema.Types.Mixed }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// 3. डमी डेटा (Real-world PC Parts) - 🔥 Updated Images with Placehold.co
const products = [
  // --- PROCESSORS (CPUs) ---
  {
    name: "Intel Core i5-13600K",
    description: "13th Gen Intel® Core™ desktop processor. 14 cores (6 P-cores + 8 E-cores).",
    price: 28500,
    discountPrice: 26999,
    category: "Processor",
    brand: "Intel",
    images: ["https://placehold.co/600x600?text=Intel+Core+i5-13600K"], // ✅ Working Image
    isFeatured: true,
    specs: {
      socket: "LGA1700",
      core: "14",
      threads: "20",
      baseClock: "3.5 GHz",
      boostClock: "5.1 GHz",
      integratedGraphics: "Yes"
    }
  },
  {
    name: "AMD Ryzen 5 7600X",
    description: "AMD Ryzen 5 7600X Desktop Processor. 6 Cores & 12 Threads.",
    price: 22000,
    discountPrice: 19999,
    category: "Processor",
    brand: "AMD",
    images: ["https://placehold.co/600x600?text=AMD+Ryzen+5+7600X"], // ✅ Working Image
    isFeatured: true,
    specs: {
      socket: "AM5",
      core: "6",
      threads: "12",
      baseClock: "4.7 GHz",
      boostClock: "5.3 GHz",
      integratedGraphics: "Yes"
    }
  },
  {
    name: "Intel Core i9-14900K",
    description: "14th Gen Intel® Core™ i9-14900K desktop processor.",
    price: 55000,
    discountPrice: 53500,
    category: "Processor",
    brand: "Intel",
    images: ["https://placehold.co/600x600?text=Intel+Core+i9-14900K"], // ✅ Working Image
    isFeatured: false,
    specs: {
      socket: "LGA1700",
      core: "24",
      threads: "32",
      baseClock: "3.2 GHz",
      boostClock: "6.0 GHz"
    }
  },

  // --- MOTHERBOARDS ---
  {
    name: "MSI PRO Z790-P WIFI",
    description: "Supports 12th/13th Gen Intel Processors, LGA 1700, DDR5 Memory.",
    price: 21000,
    discountPrice: 19500,
    category: "Motherboard",
    brand: "MSI",
    images: ["https://placehold.co/600x600?text=MSI+PRO+Z790-P"], // ✅ Working Image
    specs: {
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryType: "DDR5",
      maxMemory: "128GB"
    }
  },
  {
    name: "Gigabyte B650M Gaming X AX",
    description: "AMD AM5 Socket: Supports AMD Ryzen 7000 Series Processors.",
    price: 16500,
    discountPrice: 15999,
    category: "Motherboard",
    brand: "Gigabyte",
    images: ["https://placehold.co/600x600?text=Gigabyte+B650M"], // ✅ Working Image
    specs: {
      socket: "AM5",
      chipset: "B650",
      formFactor: "Micro-ATX",
      memoryType: "DDR5",
      maxMemory: "192GB"
    }
  },

  // --- RAM ---
  {
    name: "Corsair Vengeance 32GB (16GBx2) DDR5",
    description: "DDR5 5200MHz C40 Intel XMP iCUE Compatible Computer Memory.",
    price: 9500,
    discountPrice: 8999,
    category: "RAM",
    brand: "Corsair",
    images: ["https://placehold.co/600x600?text=Corsair+Vengeance+32GB"], // ✅ Working Image
    specs: {
      type: "DDR5",
      speed: "5200MHz",
      capacity: "32GB",
      kit: "Dual Channel"
    }
  },
  {
    name: "XPG ADATA GAMMIX D30 DDR4 16GB",
    description: "DDR4 3200MHz RAM for Desktop.",
    price: 3200,
    discountPrice: 2999,
    category: "RAM",
    brand: "XPG",
    images: ["https://placehold.co/600x600?text=XPG+GAMMIX+D30"], // ✅ Working Image
    specs: {
      type: "DDR4",
      speed: "3200MHz",
      capacity: "16GB",
      kit: "Single Stick"
    }
  },

  // --- GRAPHICS CARDS ---
  {
    name: "Zotac Gaming GeForce RTX 4060",
    description: "8GB GDDR6 128-bit 17 Gbps PCIE 4.0 Gaming Graphics Card.",
    price: 29000,
    discountPrice: 27500,
    category: "Graphics Card",
    brand: "Zotac",
    images: ["https://placehold.co/600x600?text=Zotac+RTX+4060"], // ✅ Working Image
    isFeatured: true,
    specs: {
      memory: "8GB",
      memoryType: "GDDR6",
      chipset: "NVIDIA RTX 4060",
      ports: "HDMI, DisplayPort"
    }
  }
];

// 4. डेटाबेस में डेटा डालने का फंक्शन
async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // पुराना डेटा साफ़ करें (ताकि डुप्लीकेट न हो)
    await Product.deleteMany({});
    console.log("🗑️  Old products cleared");

    // नया डेटा डालें
    await Product.insertMany(products);
    console.log(`🎉 Successfully added ${products.length} products!`);

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDB();