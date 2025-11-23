import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    // अगर Google Login यूज़ करेंगे तो पासवर्ड खाली हो सकता है
    required: false, 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  // यूजर का सेव किया हुआ पता (Shipping Address)
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    phone: String
  },
  // अगर यूजर ने कोई PC Build सेव किया हो
  savedBuilds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PcBuild'
  }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);