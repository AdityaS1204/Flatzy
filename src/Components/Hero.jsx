// components/Hero.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Tag, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { heroImg1,heroImg2,heroImg3 } from '../assets';
const images = [
  heroImg2,
  heroImg1,
  heroImg3, 
];

const heroContent = [
  {
    title: "New Property Launch",
    subtitle: "Get 10% off on booking amount",
    description: "Explore our latest properties with exclusive discounts and premium amenities.",
    discount: "10% OFF",
    icon: <Tag className="w-6 h-6 text-yellow-300" />
  },
  {
    title: "Student Special Offers",
    subtitle: "Exclusive discounts for students",
    description: "Find perfect PG accommodations with special student pricing and flexible terms.",
    discount: "15% OFF",
    icon: <Percent className="w-6 h-6 text-yellow-300" />
  },
  {
    title: "Premium Luxury Flats",
    subtitle: "20% discount on first month rent",
    description: "Experience luxury living with premium amenities and unbeatable rental offers.",
    discount: "20% OFF",
    icon: <Tag className="w-6 h-6 text-yellow-300" />
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    maxPrice: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted:', searchData);
    setIsSearchModalOpen(false);
    
    // Redirect to listings page with search parameters
    const searchParams = new URLSearchParams();
    if (searchData.location) searchParams.set('location', searchData.location);
    if (searchData.propertyType) searchParams.set('propertyType', searchData.propertyType);
    if (searchData.maxPrice) searchParams.set('maxPrice', searchData.maxPrice);
    
    navigate(`/listings?${searchParams.toString()}`);
  };

  const handleDesktopSearch = () => {
    // Get values from desktop search form
    const locationSelect = document.querySelector('select[data-search="location"]');
    const propertyTypeSelect = document.querySelector('select[data-search="propertyType"]');
    const maxPriceSelect = document.querySelector('select[data-search="maxPrice"]');
    
    const searchParams = new URLSearchParams();
    if (locationSelect?.value) searchParams.set('location', locationSelect.value);
    if (propertyTypeSelect?.value) searchParams.set('propertyType', propertyTypeSelect.value);
    if (maxPriceSelect?.value) searchParams.set('maxPrice', maxPriceSelect.value);
    
    navigate(`/listings?${searchParams.toString()}`);
  };

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div
      className="relative h-[60vh] sm:h-[80vh] md:h-[80vh] w-11/12 bg-cover bg-center transition-all duration-1000 rounded-2xl sm:rounded-3xl md:rounded-4xl mx-2 sm:mx-4 md:mx-10 my-4 sm:my-6 md:my-10 overflow-hidden"
      style={{ 
        backgroundImage: `url(${(images[current])})` 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/80 to-[#1E40AF]/60 flex flex-col justify-center items-center text-center px-4 sm:px-6 text-white">
        
        {/* Animated Hero Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Discount Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-yellow-300/30"
            >
              {heroContent[current].icon}
              <span className="text-yellow-300 font-bold text-lg">
                {heroContent[current].discount}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-2 mb-2"
            >
              {heroContent[current].title}
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-yellow-300 mb-3"
            >
              {heroContent[current].subtitle}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-xl px-2 text-white/90"
            >
              {heroContent[current].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Desktop Search Bar */}
        <div className="hidden bg-white rounded-full mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6 py-3 sm:py-4 shadow-lg md:flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 w-full max-w-4xl mx-2 sm:mx-4">
          
          <select 
            data-search="location"
            className="flex-1 px-3 sm:px-4 py-2 rounded-full border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm sm:text-base text-[#1E293B]"
          >
            <option value="">Choose Location</option>
            <option value="Near Ghrce">Near Ghrce</option>
            <option value="Near Ycce">Near Ycce</option>
            <option value="Near Vasudev nagar">Near Vasudev nagar</option>
            <option value="Near Ghrcem">Near Ghrcem</option>
          </select>
          <select 
            data-search="propertyType"
            className="flex-1 px-3 sm:px-4 py-2 rounded-full border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm sm:text-base text-[#1E293B]"
          >
            <option value="">Property Type</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
            <option value="Studio">Studio</option>
            <option value="PG">PG</option>
          </select>
          <select 
            data-search="maxPrice"
            className="flex-1 px-3 sm:px-4 py-2 rounded-full border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-sm sm:text-base text-[#1E293B]"
          >
            <option value="">Max Price</option>
            <option value="5000">₹5,000</option>
            <option value="8000">₹8,000</option>
            <option value="10000">₹10,000</option>
            <option value="20000">₹20,000</option>
          </select>
          <button 
            onClick={handleDesktopSearch}
            className="bg-[#2563EB] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium hover:bg-[#1E40AF] transition-colors"
          >
            Search
          </button>
        </div>

        {/* Mobile Search Bar */}
        <motion.div 
          className="md:hidden w-full max-w-sm mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full bg-white/90 backdrop-blur-sm rounded-full px-6 py-4 flex items-center justify-between text-[#1E293B] shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-[#64748B]" />
              <span className="text-sm font-medium">Search properties...</span>
            </div>
            <div className="w-2 h-2 bg-[#2563EB] rounded-full"></div>
          </button>
        </motion.div>
      </div>

      {/* Mobile Search Modal */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsSearchModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#1E293B]">Search Properties</h3>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-[#64748B]" />
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Location</label>
                  <select 
                    value={searchData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-[#1E293B] bg-white"
                  >
                    <option value="">Choose Location</option>
                    <option value="Near Ghrce">Near Ghrce</option>
                    <option value="Near Ycce">Near Ycce</option>
                    <option value="Near Vasudev nagar">Near Vasudev nagar</option>
                    <option value="Near Ghrcem">Near Ghrcem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Property Type</label>
                  <select 
                    value={searchData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-[#1E293B] bg-white"
                  >
                    <option value="">Property Type</option>
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="4BHK">4BHK</option>
                    <option value="Studio">Studio</option>
                    <option value="PG">PG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">Max Price</label>
                  <select 
                    value={searchData.maxPrice}
                    onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] text-[#1E293B] bg-white"
                  >
                    <option value="">Max Price</option>
                    <option value="5000">₹5,000</option>
                    <option value="8000">₹8,000</option>
                    <option value="10000">₹10,000</option>
                    <option value="20000">₹20,000</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#1E40AF] transition-colors mt-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Search Properties
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
