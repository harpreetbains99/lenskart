import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Eyeglasses', 'Sunglasses', 'Contact Lenses', 'Accessories'],
    required: true,
  },
  brand: {
    type: String,
  },
  images: [
    {
      type: String, // URLs to the images
    },
  ],
  stock: {
    type: Number,
    default: 0,
  },
  frameType: {
    type: String,
    enum: ['Full Rim', 'Half Rim', 'Rimless'],
  },
  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex'],
  },
  color: {
    type: String,
  },
  material: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      rating: Number,
    },
  ],
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);