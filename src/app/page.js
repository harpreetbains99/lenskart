"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Summer Collection 2023",
      subtitle: "Get 50% Off on Sunglasses",
      image: "/banner1.jpg",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "Premium Eyewear",
      subtitle: "New Arrivals with Blue Light Protection",
      image: "/banner2.jpg",
      cta: "Explore"
    },
    {
      id: 3,
      title: "Trendy Frames",
      subtitle: "Starting at ₹999",
      image: "/banner3.jpg",
      cta: "View Collection"
    }
  ];

  const categories = [
    { name: "Eyeglasses", icon: "👓", count: 1250 },
    { name: "Sunglasses", icon: "🕶️", count: 850 },
    { name: "Computer Glasses", icon: "💻", count: 620 },
    { name: "Contact Lenses", icon: "🔍", count: 430 },
    { name: "Power Sunglasses", icon: "☀️", count: 380 },
  ];

  const trendingProducts = [
    { id: 1, name: "Aviator Sunglasses", price: "₹1,499", originalPrice: "₹2,999", discount: "50% OFF", image: "/product1.jpg" },
    { id: 2, name: "Round Metal Frame", price: "₹1,999", originalPrice: "₹3,499", discount: "42% OFF", image: "/product2.jpg" },
    { id: 3, name: "Wayfarer Classic", price: "₹1,799", originalPrice: "₹2,999", discount: "40% OFF", image: "/product3.jpg" },
    { id: 4, name: "Rectangle Anti-Glare", price: "₹2,199", originalPrice: "₹3,999", discount: "45% OFF", image: "/product4.jpg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Lenskart - India's Favorite Eyewear Brand</title>
        <meta name="description" content="Buy eyeglasses, sunglasses, contact lenses and more at best prices in India" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                className="mr-4 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="text-2xl font-bold text-blue-600">Lenskart</div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="font-medium hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="font-medium hover:text-blue-600 transition-colors">Eyeglasses</a>
              <a href="#" className="font-medium hover:text-blue-600 transition-colors">Sunglasses</a>
              <a href="#" className="font-medium hover:text-blue-600 transition-colors">Contact Lenses</a>
              <a href="#" className="font-medium hover:text-blue-600 transition-colors">Store Locator</a>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-1 hover:bg-gray-100 rounded-full transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
              <a href="#" className="font-medium py-2 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="font-medium py-2 hover:text-blue-600 transition-colors">Eyeglasses</a>
              <a href="#" className="font-medium py-2 hover:text-blue-600 transition-colors">Sunglasses</a>
              <a href="#" className="font-medium py-2 hover:text-blue-600 transition-colors">Contact Lenses</a>
              <a href="#" className="font-medium py-2 hover:text-blue-600 transition-colors">Store Locator</a>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        {/* Hero Slider */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <div 
                className="absolute inset-0 bg-black/30"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="container mx-auto px-4 relative z-10 text-white">
                <div className="max-w-lg">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 animate-fadeInUp">{slide.title}</h1>
                  <p className="text-xl mb-6 animate-fadeInUp delay-100">{slide.subtitle}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 animate-fadeInUp delay-200">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-blue-600 w-6' : 'bg-white/50'}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <div 
                  key={category.name}
                  className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-gray-500 text-sm">{category.count}+ Products</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Trending Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-6 rounded-full transition-all duration-300">
                View All Products
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 hover:bg-gray-50 rounded-lg transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Authentic</h3>
                <p className="text-gray-600">All our products are 100% authentic with brand warranty</p>
              </div>
              <div className="text-center p-6 hover:bg-gray-50 rounded-lg transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free shipping on all orders above ₹999</p>
              </div>
              <div className="text-center p-6 hover:bg-gray-50 rounded-lg transition-all">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-gray-600">14-day easy return policy on all products</p>
              </div>
            </div>
          </div>
        </section>

        {/* Try On Banner */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Try Before You Buy</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Use our virtual try-on feature to see how frames look on your face before purchasing</p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105">
              Try Virtual Try-On
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Lenskart</h3>
              <p className="text-gray-400">India's favorite eyewear brand. Shop for eyeglasses, sunglasses, contact lenses and more.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Men's Eyeglasses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Women's Eyeglasses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kids' Eyeglasses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sunglasses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchange</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Download App</h4>
                <div className="flex space-x-2">
                  <a href="#" className="block">
                    <img src="/google-play-badge.png" alt="Get it on Google Play" className="h-10" />
                  </a>
                  <a href="#" className="block">
                    <img src="/app-store-badge.png" alt="Download on the App Store" className="h-10" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Lenskart. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}