'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation, stagger } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiSearch, FiShoppingCart, FiHeart, FiFilter, FiX, FiMenu, FiUser } from 'react-icons/fi';

export default function ProductsPage() {
  // State management
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    limit: 12,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    frameType: '',
    search: '',
    priceRange: [0, 1000],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const controls = useAnimation();
  const searchInputRef = useRef(null);

  // Fetch products
  const fetchProducts = async (page = 1, filterParams = {}) => {
    try {
      setLoading(true);
      await controls.start({ opacity: 0, transition: { duration: 0.3 } });

      const queryParams = new URLSearchParams({
        page,
        limit: pagination.limit,
        ...filterParams,
      }).toString();

      const response = await fetch(`/api/productcard?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
        setPagination(data.pagination);
        setError(null);

        const initialIndices = {};
        data.products.forEach((product) => {
          initialIndices[product._id] = 0;
        });
        setActiveImageIndex(initialIndices);

        await controls.start({ opacity: 1, transition: { duration: 0.5 } });
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, filters);
  }, []);

  // Helper functions
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(newPage, filters);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (values) => {
    setFilters((prev) => ({ ...prev, priceRange: values }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(1, filters);
    setMobileFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      gender: '',
      frameType: '',
      search: '',
      priceRange: [0, 1000],
    });
    if (searchInputRef.current) searchInputRef.current.value = '';
    setMobileFiltersOpen(false);
  };

  const handleNextImage = (productId) => {
    setActiveImageIndex((prev) => {
      const product = products.find((p) => p._id === productId);
      const currentIndex = prev[productId];
      const nextIndex = (currentIndex + 1) % product.images.length;
      return { ...prev, [productId]: nextIndex };
    });
  };

  const handlePrevImage = (productId) => {
    setActiveImageIndex((prev) => {
      const product = products.find((p) => p._id === productId);
      const currentIndex = prev[productId];
      const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
      return { ...prev, [productId]: prevIndex };
    });
  };


  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Loading skeleton
  const loadingSkeleton = Array.from({ length: pagination.limit }).map((_, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg"
    >
      <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-3/4 animate-pulse"></div>
        <div className="h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-1/2 animate-pulse"></div>
        <div className="h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-1/3 animate-pulse"></div>
        <div className="flex justify-between mt-6">
          <div className="h-7 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-1/4 animate-pulse"></div>
          <div className="h-7 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-1/3 animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  ));

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Hero Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-300 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Elevate Your Vision
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            >
              Discover premium eyewear that combines style, comfort and clarity
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Collection</h2>
            <p className="text-gray-600 mt-2">
              {pagination.totalProducts} premium eyewear products
            </p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all flex-1 md:flex-none justify-center"
            >
              <FiFilter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </motion.button>
            
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                ref={searchInputRef}
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pl-11 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-gray-50 transition-all"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </motion.div>

        {/* Mobile Filters */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}></div>
              <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSearchSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search
                    </label>
                    <div className="relative rounded-xl overflow-hidden">
                      <input
                        type="text"
                        name="search"
                        ref={searchInputRef}
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Search products..."
                        className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-gray-50"
                      />
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Eyeglasses', 'Sunglasses', 'Contact Lenses', 'Accessories'].map((cat) => (
                        <motion.button
                          key={cat}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, category: prev.category === cat ? '' : cat }))}
                          className={`px-4 py-2.5 rounded-xl border transition-all ${
                            filters.category === cat
                              ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {cat}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Men', 'Women', 'Unisex'].map((gender) => (
                        <motion.button
                          key={gender}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender === gender ? '' : gender }))}
                          className={`px-4 py-2.5 rounded-xl border transition-all ${
                            filters.gender === gender
                              ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {gender}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frame Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Full Rim', 'Half Rim', 'Rimless'].map((type) => (
                        <motion.button
                          key={type}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, frameType: prev.frameType === type ? '' : type }))}
                          className={`px-4 py-2.5 rounded-xl border transition-all ${
                            filters.frameType === type
                              ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Price Range</span>
                      <span className="text-sm text-gray-500">
                        ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                      </span>
                    </div>
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.priceRange[0]}
                        onChange={(e) => handlePriceChange([parseInt(e.target.value), filters.priceRange[1]])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceChange([filters.priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-md transition-all shadow"
                    >
                      Apply Filters
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleClearFilters}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Reset
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="mb-16">
          {error ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md mx-auto text-center shadow-sm"
            >
              <p className="mb-3">{error}</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => fetchProducts(pagination.currentPage, filters)}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all duration-300 shadow hover:shadow-md"
              >
                Retry
              </motion.button>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={container}
                initial="hidden"
                animate={loading ? "hidden" : "show"}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    loadingSkeleton
                  ) : (
                    products.map((product) => (
                      <motion.div
                        key={product._id}
                        layout
                        variants={item}
                        initial="hidden"
                        animate="show"
                        whileHover="hover"
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative group"
                      >
                        {/* Sale Badge */}
                        {product.onSale && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
                          >
                            SALE
                          </motion.div>
                        )}
                        
                        <div className="relative h-80 overflow-hidden">
                          {product.images && product.images.length > 0 ? (
                            <>
                              <Image
                                src={product.images[activeImageIndex[product._id]]?.url || '/placeholder-product.jpg'}
                                alt={product.name}
                                fill
                                className="object-contain transition-opacity duration-500 group-hover:opacity-90"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                priority={products.indexOf(product) < 4}
                              />
                              
                              {/* Image navigation dots */}
                              {product.images.length > 1 && (
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                                  {product.images.map((_, idx) => (
                                    <motion.button
                                      key={idx}
                                      whileHover={{ scale: 1.2 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActiveImageIndex((prev) => ({
                                          ...prev,
                                          [product._id]: idx,
                                        }));
                                      }}
                                      className={`w-2 h-2 rounded-full transition-all ${
                                        activeImageIndex[product._id] === idx ? 'bg-white w-3' : 'bg-white/50'
                                      }`}
                                      aria-label={`View image ${idx + 1}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">No Image Available</span>
                            </div>
                          )}
                          {/* Navigation arrows */}
                          {product.images && product.images.length > 1 && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handlePrevImage(product._id);
                                }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
                                aria-label="Previous image"
                              >
                                <FiChevronLeft className="w-5 h-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleNextImage(product._id);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
                                aria-label="Next image"
                              >
                                <FiChevronRight className="w-5 h-5" />
                              </motion.button>
                            </>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="flex flex-col items-end">
                              <span className="text-lg font-bold text-indigo-600 whitespace-nowrap ml-2">
                                ₹{product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-xs text-gray-500 line-through">
                                  ₹{product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full capitalize">
                              {product.category}
                            </span>
                            {product.brand && (
                              <span className="text-xs px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full">
                                {product.brand}
                              </span>
                            )}
                            {product.frameType && (
                              <span className="text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-full">
                                {product.frameType}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex items-center mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                ({product.numReviews || 0})
                              </span>
                            </div>
                            
                            <Link href={`products/${product._id}`} className="block group">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                              >
                                BUY NOW
                              </motion.button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200"
              >
                <div className="text-sm text-gray-600">
                  Showing {(pagination.currentPage - 1) * pagination.limit + 1}-
                  {Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts)} of{' '}
                  {pagination.totalProducts} products
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1 || loading}
                    className={`flex items-center gap-1 px-4 py-2.5 rounded-xl border transition-all ${
                      pagination.currentPage === 1 || loading
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
                    }`}
                  >
                    <FiChevronLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </motion.button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }

                      return (
                        <motion.button
                          key={pageNum}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePageChange(pageNum)}
                          disabled={loading}
                          className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${
                            pagination.currentPage === pageNum
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    })}
                    
                    {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                      <>
                        <span className="text-gray-500 px-2">...</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePageChange(pagination.totalPages)}
                          disabled={loading}
                          className="w-10 h-10 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400"
                        >
                          {pagination.totalPages}
                        </motion.button>
                      </>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages || loading}
                    className={`flex items-center gap-1 px-4 py-2.5 rounded-xl border transition-all ${
                      pagination.currentPage === pagination.totalPages || loading
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
                    }`}
                  >
                    <span>Next</span>
                    <FiChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </div>


      </main>
    </div>
  );
}