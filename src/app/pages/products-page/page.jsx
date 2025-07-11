'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar, FiSearch, FiShoppingCart, FiHeart, FiFilter, FiX } from 'react-icons/fi';
import Navbar from '../../../components/Navbar';

export default function ProductsPage() {
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
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const controls = useAnimation();
  const searchInputRef = useRef(null);

  const fetchProducts = async (page = 1, filterParams = {}) => {
    try {
      setLoading(true);
      controls.start({
        opacity: 0,
        transition: { duration: 0.3 },
      });

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

        controls.start({
          opacity: 1,
          transition: { duration: 0.5 },
        });
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(newPage, filters);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    });
    fetchProducts(1, { category: '', gender: '', frameType: '', search: '' });
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
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

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement cart logic
    alert(`${product.name} added to cart`);
  };

  const handleAddToWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement wishlist logic
    alert(`${product.name} added to wishlist`);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const loadingSkeleton = Array.from({ length: pagination.limit }).map((_, index) => (
    <div
      key={index}
      className="border rounded-xl overflow-hidden shadow-sm bg-white animate-pulse"
    >
      <div className="relative h-64 bg-gray-200 rounded-t-xl"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded-full w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/3"></div>
        <div className="flex justify-between mt-4">
          <div className="h-6 bg-gray-200 rounded-full w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded-full w-1/3"></div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Discover Premium Eyewear
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Find the perfect pair that matches your style and vision needs
            </motion.p>
          </div>

          {/* Mobile Filter Button */}
          <div className="mb-6 lg:hidden flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {pagination.totalProducts} products
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50"
            >
              <FiFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-28">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
                  <form onSubmit={handleSearchSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="search"
                          ref={searchInputRef}
                          value={filters.search}
                          onChange={handleFilterChange}
                          placeholder="Search products..."
                          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        />
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="">All Categories</option>
                        <option value="Eyeglasses">Eyeglasses</option>
                        <option value="Sunglasses">Sunglasses</option>
                        <option value="Contact Lenses">Contact Lenses</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={filters.gender}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="">All Genders</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frame Type
                      </label>
                      <select
                        name="frameType"
                        value={filters.frameType}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="">All Frame Types</option>
                        <option value="Full Rim">Full Rim</option>
                        <option value="Half Rim">Half Rim</option>
                        <option value="Rimless">Rimless</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Apply Filters
                      </button>
                      {(filters.category || filters.gender || filters.frameType || filters.search) && (
                        <button
                          type="button"
                          onClick={handleClearFilters}
                          className="px-3 py-2 text-gray-700 hover:text-gray-900"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Mobile Filters Overlay */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div 
                      className="absolute inset-0 bg-gray-500 opacity-75"
                      onClick={() => setMobileFiltersOpen(false)}
                    ></div>
                  </div>

                  <div className="inline-block align-bottom bg-white rounded-t-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                        <button
                          onClick={() => setMobileFiltersOpen(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <FiX className="h-6 w-6" />
                        </button>
                      </div>

                      <form onSubmit={handleSearchSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Search
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="search"
                              ref={searchInputRef}
                              value={filters.search}
                              onChange={handleFilterChange}
                              placeholder="Search products..."
                              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          >
                            <option value="">All Categories</option>
                            <option value="Eyeglasses">Eyeglasses</option>
                            <option value="Sunglasses">Sunglasses</option>
                            <option value="Contact Lenses">Contact Lenses</option>
                            <option value="Accessories">Accessories</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={filters.gender}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          >
                            <option value="">All Genders</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Frame Type
                          </label>
                          <select
                            name="frameType"
                            value={filters.frameType}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                          >
                            <option value="">All Frame Types</option>
                            <option value="Full Rim">Full Rim</option>
                            <option value="Half Rim">Half Rim</option>
                            <option value="Rimless">Rimless</option>
                          </select>
                        </div>
                      </form>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Apply Filters
                      </button>
                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md mx-auto text-center shadow-sm">
                  <p className="mb-3">{error}</p>
                  <button
                    onClick={() => fetchProducts(pagination.currentPage, filters)}
                    className="mt-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all duration-300 shadow hover:shadow-md"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <>
                  {/* Active Filters */}
                  {(filters.category || filters.gender || filters.frameType || filters.search) && (
                    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">Active filters:</span>
                        {filters.search && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Search: {filters.search}
                            <button
                              onClick={() => {
                                setFilters(prev => ({ ...prev, search: '' }));
                                if (searchInputRef.current) searchInputRef.current.value = '';
                              }}
                              className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </span>
                        )}
                        {filters.category && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {filters.category}
                            <button
                              onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                              className="ml-1.5 inline-flex text-purple-400 hover:text-purple-600"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </span>
                        )}
                        {filters.gender && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {filters.gender}
                            <button
                              onClick={() => setFilters(prev => ({ ...prev, gender: '' }))}
                              className="ml-1.5 inline-flex text-green-400 hover:text-green-600"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </span>
                        )}
                        {filters.frameType && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {filters.frameType}
                            <button
                              onClick={() => setFilters(prev => ({ ...prev, frameType: '' }))}
                              className="ml-1.5 inline-flex text-yellow-400 hover:text-yellow-600"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </span>
                        )}
                        <button
                          onClick={handleClearFilters}
                          className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Products */}
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate={loading ? 'hidden' : 'show'}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    <AnimatePresence mode="wait">
                      {loading ? (
                        loadingSkeleton
                      ) : (
                        products.map((product) => (
                          <motion.div
                            key={product._id}
                            variants={item}
                            whileHover={{ y: -5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                          >
                            <Link href={`products/${product._id}`} className="block group">
                              <div className="relative h-64">
                                {product.images && product.images.length > 0 ? (
                                  <>
                                    <Image
                                      src={product.images[activeImageIndex[product._id]]?.url || '/placeholder-product.jpg'}
                                      alt={product.name}
                                      fill
                                      className="object-cover transition-opacity duration-500"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                      priority={products.indexOf(product) < 4}
                                    />
                                    {/* Quick actions overlay */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                      <button
                                        onClick={(e) => handleAddToCart(e, product)}
                                        className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                        aria-label="Add to cart"
                                      >
                                        <FiShoppingCart className="w-5 h-5" />
                                      </button>
                                      <button
                                        onClick={(e) => handleAddToWishlist(e, product)}
                                        className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
                                        aria-label="Add to wishlist"
                                      >
                                        <FiHeart className="w-5 h-5" />
                                      </button>
                                    </div>
                                    {/* Image navigation dots */}
                                    {product.images.length > 1 && (
                                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                                        {product.images.map((_, idx) => (
                                          <button
                                            key={idx}
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
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400">No Image Available</span>
                                  </div>
                                )}
                                {/* Navigation arrows */}
                                {product.images && product.images.length > 1 && (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handlePrevImage(product._id);
                                      }}
                                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                      aria-label="Previous image"
                                    >
                                      <FiChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleNextImage(product._id);
                                      }}
                                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                      aria-label="Next image"
                                    >
                                      <FiChevronRight className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                              <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                    {product.name}
                                  </h3>
                                  <span className="text-lg font-bold text-blue-600 whitespace-nowrap ml-2">
                                    ₹{product.price.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                  <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full capitalize">
                                    {product.category}
                                  </span>
                                  {product.brand && (
                                    <span className="text-xs px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full">
                                      {product.brand}
                                    </span>
                                  )}
                                </div>
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
                                    ({product.numReviews || 0} reviews)
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Pagination */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Showing {(pagination.currentPage - 1) * pagination.limit + 1}-
                      {Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts)} of{' '}
                      {pagination.totalProducts} products
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1 || loading}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-all ${
                          pagination.currentPage === 1 || loading
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <FiChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
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
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              disabled={loading}
                              className={`w-10 h-10 rounded-lg transition-all flex items-center justify-center ${
                                pagination.currentPage === pageNum
                                  ? 'bg-blue-600 text-white shadow-md'
                                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                          <>
                            <span className="text-gray-500 px-2">...</span>
                            <button
                              onClick={() => handlePageChange(pagination.totalPages)}
                              disabled={loading}
                              className="w-10 h-10 rounded-lg bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400"
                            >
                              {pagination.totalPages}
                            </button>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages || loading}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-all ${
                          pagination.currentPage === pagination.totalPages || loading
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <span>Next</span>
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}