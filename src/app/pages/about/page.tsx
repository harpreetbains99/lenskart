'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';

const AboutPage = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <>
      <Head>
        <title>About Us | Lenskart - Visionary Eyewear</title>
        <meta name="description" content="Discover Lenskart's mission to revolutionize eyewear with affordable, stylish vision solutions" />
      </Head>

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            variants={item}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="text-indigo-600">Clear Vision,</span> Beautifully Crafted
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              We're revolutionizing eyewear with cutting-edge technology, affordable prices, and exceptional style.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-16 flex justify-center"
          >
            <div className="relative w-full max-w-4xl h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/about-hero.jpg" 
                alt="Lenskart team" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={item}>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Story
            </h2>
            <div className="mt-6 space-y-6 text-gray-600">
              <p>
                Founded in 2010, Lenskart began with a simple mission: to make quality eyewear accessible to everyone. 
                What started as a small online store has now become Asia's largest eyewear brand.
              </p>
              <p>
                We've disrupted the eyewear industry by eliminating middlemen, bringing factory-direct prices to our 
                customers without compromising on quality or style.
              </p>
              <p>
                Today, with over 1000 stores across 200+ cities and serving millions of happy customers, we continue 
                to innovate with virtual try-ons, AI-powered recommendations, and same-day delivery.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
          >
            <img 
              src="/about-story.jpg" 
              alt="Lenskart early days" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Values */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="py-20 bg-indigo-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Customer First",
                icon: "👓",
                description: "We exist to serve our customers. Their satisfaction drives every decision we make."
              },
              {
                title: "Innovate Daily",
                icon: "💡",
                description: "From virtual try-ons to AI-powered recommendations, we push boundaries."
              },
              {
                title: "Quality Matters",
                icon: "🔍",
                description: "Premium materials, precision craftsmanship, and rigorous quality checks."
              },
              {
                title: "Make It Affordable",
                icon: "💰",
                description: "Great vision shouldn't cost a fortune. We make quality eyewear accessible."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white/10 p-8 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold">
                  {value.title}
                </h3>
                <p className="mt-3 text-indigo-100">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Milestones */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={item} className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Journey
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Key milestones in our growth story
          </p>
        </motion.div>

        <div className="mt-16 relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform -translate-x-1/2"></div>
          
          <div className="space-y-16 lg:space-y-0">
            {[
              {
                year: "2010",
                title: "Founded",
                description: "Launched as India's first online eyewear store",
                side: "left"
              },
              {
                year: "2013",
                title: "1 Million Glasses",
                description: "Sold our millionth pair of glasses",
                side: "right"
              },
              {
                year: "2016",
                title: "Omnichannel",
                description: "Opened first physical store in Delhi",
                side: "left"
              },
              {
                year: "2019",
                title: "AI Try-On",
                description: "Introduced virtual try-on technology",
                side: "right"
              },
              {
                year: "2022",
                title: "Global Expansion",
                description: "Launched operations in Southeast Asia and Middle East",
                side: "left"
              }
            ].map((milestone, index) => (
              <motion.div 
                key={index}
                variants={item}
                className={`relative lg:w-1/2 ${milestone.side === 'left' ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'} mx-auto lg:mx-0`}
              >
                <div className={`hidden lg:block absolute top-4 w-4 h-4 bg-indigo-600 rounded-full ${milestone.side === 'left' ? '-right-2' : '-left-2'}`}></div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-sm font-semibold text-indigo-600">
                    {milestone.year}
                  </div>
                  <h3 className="mt-1 text-xl font-bold text-gray-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={item} className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Meet The Visionaries
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate team behind Lenskart's success
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Peyush Bansal",
                role: "Founder & CEO",
                image: "/team-1.jpg"
              },
              {
                name: "Amit Chaudhary",
                role: "CTO",
                image: "/team-2.jpg"
              },
              {
                name: "Neha Gupta",
                role: "Head of Design",
                image: "/team-3.jpg"
              },
              {
                name: "Rajesh Mehta",
                role: "VP of Retail",
                image: "/team-4.jpg"
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-indigo-600">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to See the Difference?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            Join millions of happy customers experiencing better vision today.
          </p>
          <div className="mt-8">
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
            >
              Shop Now
            </motion.a>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default AboutPage;