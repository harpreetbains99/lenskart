'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

const ProductPage =()=> {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Sample product data
  const product = {
    id: 1,
    name: 'Premium Aviator Sunglasses',
    brand: 'Lenskart',
    price: 129.99,
    discountPrice: 99.99,
    rating: 4.8,
    reviewCount: 1245,
    description: 'Our premium aviator sunglasses combine timeless style with advanced UV protection. Featuring polarized lenses and a lightweight metal frame for all-day comfort.',
    colors: [
      { name: 'Black', value: 'black', class: 'bg-gray-900' },
      { name: 'Gold', value: 'gold', class: 'bg-yellow-600' },
      { name: 'Silver', value: 'silver', class: 'bg-gray-400' },
      { name: 'Rose Gold', value: 'rose-gold', class: 'bg-rose-300' },
    ],
    sizes: [
      { name: 'Small', value: 'small' },
      { name: 'Medium', value: 'medium' },
      { name: 'Large', value: 'large' },
    ],
    features: [
      '100% UV protection',
      'Polarized lenses',
      'Lightweight metal frame',
      'Scratch-resistant coating',
      'Includes microfiber pouch'
    ],
    images: [
      '/glasses1.jpg',
      '/glasses2.jpg',
      '/glasses3.jpg',
      '/glasses4.jpg',
    ]
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <>
      <Head>
        <title>{product.name} | Lenskart</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex items-center text-sm text-gray-500 mb-6"
          >
            <a href="#" className="hover:text-indigo-600">Home</a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-indigo-600">Sunglasses</a>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.name}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="space-y-4"
            >
              <div className="relative bg-white rounded-xl shadow-md overflow-hidden aspect-square">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain cursor-zoom-in"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Navigation arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer aspect-square ${currentImageIndex === index ? 'ring-2 ring-indigo-500' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={slideUp}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-lg text-gray-600 mt-1">{product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
                <a href="#reviews" className="ml-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium">See all reviews</a>
              </div>

              {/* Price */}
              <div className="flex items-center">
                <p className="text-3xl font-bold text-gray-900">${product.discountPrice.toFixed(2)}</p>
                <p className="ml-3 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</p>
                <p className="ml-3 text-sm font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">
                  Save ${(product.price - product.discountPrice).toFixed(2)}
                </p>
              </div>

              {/* Description */}
              <div className="prose text-gray-600">
                <p>{product.description}</p>
              </div>

              {/* Color Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="flex space-x-3 mt-2">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color.value}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 rounded-full ${color.class} ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                      onClick={() => setSelectedColor(color.value)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="flex space-x-3 mt-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size.value}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 border rounded-md text-sm font-medium ${selectedSize === size.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'}`}
                      onClick={() => setSelectedSize(size.value)}
                    >
                      {size.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="flex items-center mt-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </motion.button>
                  <div className="px-4 py-2 border-t border-b border-gray-300 bg-white text-center w-12">
                    {quantity}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {product.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Buy Now
                </motion.button>
              </div>

              {/* Added to cart notification */}
              <AnimatePresence>
                {isAddedToCart && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to cart!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="border-b-2 border-indigo-500 text-indigo-600 py-4 px-1 text-sm font-medium">
                  Description
                </button>
                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
                  Specifications
                </button>
                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
                  Reviews
                </button>
                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
                  Shipping & Returns
                </button>
              </nav>
            </div>
            <div className="py-8">
              <div className="prose max-w-none">
                <h3 className="text-lg font-medium text-gray-900">Detailed Description</h3>
                <p className="text-gray-600 mt-2">
                  These premium aviator sunglasses are crafted with precision to offer both style and protection. 
                  The metal frame is lightweight yet durable, designed for all-day comfort. Our polarized lenses 
                  reduce glare and provide 100% UV protection, making them ideal for driving and outdoor activities.
                </p>
                <h3 className="text-lg font-medium text-gray-900 mt-6">Frame Details</h3>
                <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1">
                  <li>Material: High-grade metal alloy</li>
                  <li>Frame width: 140mm</li>
                  <li>Lens width: 58mm</li>
                  <li>Bridge: 18mm</li>
                  <li>Temple length: 145mm</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
            >
              <img 
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-auto max-h-screen object-contain"
              />
              <button 
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-colors"
                onClick={() => setIsZoomed(false)}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default ProductPage;