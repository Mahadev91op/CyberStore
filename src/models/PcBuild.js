import mongoose from 'mongoose';

const PcBuildSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    default: 'My Custom Rig' // यूजर अपने बिल्ड का नाम दे सकता है (e.g., "Gaming Beast")
  },
  // यहाँ हम हर पार्ट का ID स्टोर करेंगे
  components: {
    processor: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    motherboard: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    ram: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    graphicsCard: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    storage: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    powerSupply: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    cabinet: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    monitor: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    },
    cooler: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    }
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  // 🔥 Advanced Feature: Share Build
  // अगर यह true है, तो कोई भी लिंक के जरिए यह बिल्ड देख सकता है
  isPublic: {
    type: Boolean,
    default: false
  },
  shareToken: {
    type: String, // e.g., "build-123xyz"
    unique: true,
    sparse: true // Allows null/undefined values to be non-unique
  }
}, { timestamps: true });

// Next.js hot reloading issue fix
export default mongoose.models.PcBuild || mongoose.model('PcBuild', PcBuildSchema);