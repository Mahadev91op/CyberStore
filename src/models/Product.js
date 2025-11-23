import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 1HK characters']
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  discountPrice: {
    type: Number, // अगर सेल चल रही हो
    default: 0
  },
  images: {
    type: [String], // array of image URLs
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Processor', 'Motherboard', 'RAM', 'Graphics Card', 'Storage', 'Power Supply', 'Cabinet', 'Monitor', 'Accessories']
  },
  brand: {
    type: String,
    required: true // e.g., Intel, AMD, ASUS, MSI
  },
  stock: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  // 🔥 PC Builder Logic के लिए सबसे जरूरी फील्ड
  // यह हर पार्ट के हिसाब से अलग होगा।
  // Example for CPU: { "socket": "LGA1700", "core": "16", "threads": "24" }
  // Example for RAM: { "type": "DDR5", "speed": "5200MHz" }
  specs: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

// अगर मॉडल पहले से बना है तो वही यूज़ करें, नहीं तो नया बनाएं
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);