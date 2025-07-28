import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2,
  Wifi,
  Snowflake,
  Car,
  UtensilsCrossed,
  Share2,
  Phone,
  Mail
} from 'lucide-react';
import { whatsappRedirect } from '../Utils/Whatsapp';
import { gridImg1, gridImg2, gridImg3 } from '../assets/index';
import { Navbar } from '../Components';
import { API_ENDPOINTS } from '../config/api';

// Property Card Component - Horizontal Layout
const PropertyCard = ({ property }) => {
  const amenitiesList = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'ac', label: 'AC', icon: Snowflake },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'food', label: 'Food', icon: UtensilsCrossed }
  ];

  const visitmsg = `hey, there i want to know more about ${property.name} in ${property.address}`;
  const booknowmsg = `hey, there i want to book ${property.name} in ${property.address}`;

  // Use default image if no images available
  const propertyImage = property.images && property.images.length > 0 
    ? property.images[0].url 
    : gridImg1;

    return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E2E8F0] hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[200px] lg:h-96">
        {/* Property Image - Top on mobile, Left on desktop */}
        <div className="relative w-full lg:w-1/3 h-48 lg:h-full">
          <img
            src={propertyImage}
            alt={property.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
              <Share2 className="w-4 h-4 text-[#2563EB]" />
            </button>
          </div>
          {property.status === 'rented' && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Rented
            </div>
          )}
        </div>

        {/* Property Details - Bottom on mobile, Right on desktop */}
        <div className="flex-1 p-4 lg:p-6 flex flex-col justify-between">
          <div className="space-y-2 lg:space-y-4">
            {/* Header */}
            <div>
              <h3 className="text-lg lg:text-xl font-semibold text-[#1E293B] mb-2">{property.name}</h3>
              <div className="flex items-center gap-2 text-sm text-[#64748B] mb-3">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{property.address}</span>
              </div>
            </div>

            {/* Property Type and Price */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#2563EB]" />
                <span className="text-sm font-medium text-[#1E293B]">{property.propertyType}</span>
                {property.accommodationType && property.accommodationType !== 'unisex' && (
                  <span className="text-xs px-2 py-1 bg-[#FEF3C7] text-[#92400E] rounded-full font-medium">
                    {property.accommodationType === 'male' ? 'Male Only' : 'Female Only'}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-end">
                {property.offer && property.offer < property.rent ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base lg:text-lg text-[#059669]">₹{property.offer.toLocaleString()}</span>
                      <span className="text-xs lg:text-sm text-[#64748B]">/month</span>
                    </div>
                    {property.rent && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm text-[#64748B] line-through">₹{property.rent.toLocaleString()}</span>
                      </div>
                    )}
                  </>
                ) : (
                  property.rent && (
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-base lg:text-lg text-[#2563EB]">₹{property.rent.toLocaleString()}</span>
                      <span className="text-xs lg:text-sm text-[#64748B]">/month</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 lg:gap-2">
                {property.amenities.map(amenity => {
                  const amenityInfo = amenitiesList.find(a => a.id === amenity);
                  if (!amenityInfo) return null;
                  const Icon = amenityInfo.icon;
                  return (
                    <span key={amenity} className="flex items-center gap-1 text-xs px-2 lg:px-3 py-1 bg-[#EFF6FF] text-[#2563EB] rounded-full font-medium">
                      <Icon className="w-3 h-3" />
                      {amenityInfo.label}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Nearby Places */}
            {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
              <div>
                <p className="text-sm font-medium text-[#1E293B] mb-2">Nearby:</p>
                <div className="flex flex-wrap gap-1 lg:gap-2">
                  {property.nearbyPlaces.slice(0, 2).map((place, index) => (
                    <span key={index} className="text-xs px-2 lg:px-3 py-1 bg-[#F8FAFC] text-[#64748B] rounded-full border border-[#E2E8F0]">
                      {place}
                    </span>
                  ))}
                  {property.nearbyPlaces.length > 2 && (
                    <span className="text-xs text-[#64748B]">+{property.nearbyPlaces.length - 2} more</span>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {property.description && (
              <p className="text-sm text-[#64748B] line-clamp-2">
                {property.description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 lg:gap-3 pt-3 lg:pt-4 border-t border-[#E2E8F0] mt-3 lg:mt-4">
            <button 
              className="flex-1 py-2 px-3 lg:px-4 bg-[#2563EB] text-white rounded-lg hover:bg-[#1E40AF] transition-colors text-xs lg:text-sm font-medium flex items-center justify-center gap-1 lg:gap-2"
              onClick={() => whatsappRedirect(visitmsg)}
            >
              <Phone className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Schedule Visit</span>
              <span className="sm:hidden">Visit</span>
            </button>
            <button 
              className="flex-1 py-2 px-3 lg:px-4 border border-[#2563EB] text-[#2563EB] rounded-lg hover:bg-[#2563EB] hover:text-white transition-colors text-xs lg:text-sm font-medium flex items-center justify-center gap-1 lg:gap-2"
              onClick={() => whatsappRedirect(booknowmsg)}
            >
              <Mail className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Book Now</span>
              <span className="sm:hidden">Book</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search and Filter Component
const SearchFilters = ({ onSearch, onFilter, initialSearch = '' }) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      search: initialSearch
    }
  });
  const [showFilters, setShowFilters] = useState(false);

  const onSubmit = (data) => {
    onSearch(data);
  };

  const propertyTypes = ['All', '1BHK', '2BHK', '3BHK', '4BHK', 'Studio', 'PG'];
  const accommodationTypes = ['All', 'male', 'female', 'unisex'];
  const statusOptions = ['All', 'available', 'rented', 'maintenance'];

  return (
    <div className="p-4 lg:p-6 mb-8">
      
      {/* Search Bar - Home Page Style */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="flex justify-center w-full gap-3 sm:gap-4">
          <div className='flex flex-col sm:flex-row justify-between w-11/12 sm:w-6/12 gap-3 sm:gap-7'>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#64748B] w-5 h-5" />
              <input
                {...register('search')}
                type="text"
                placeholder="Search properties by name, address, or description..."
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] placeholder-[#64748B] focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] focus:outline-none transition-all duration-300"
              />
            </div>
            <button 
              type="submit"
              className="bg-[#2563EB] text-white ring-2 ring-[#2563EB] px-4 sm:px-6 py-3 rounded-full hover:scale-105 hover:bg-[#1E40AF] hover:ring-[#1E40AF] hover:cursor-pointer duration-300 transition text-sm sm:text-base font-medium"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#1E293B] transition-colors"
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Property Type</label>
              <select
                {...register('propertyType')}
                onChange={(e) => onFilter({ propertyType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] focus:outline-none transition-all duration-300"
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type === 'All' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Accommodation Type Filter */}
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Accommodation Type</label>
              <select
                {...register('accommodationType')}
                onChange={(e) => onFilter({ accommodationType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] focus:outline-none transition-all duration-300"
              >
                {accommodationTypes.map(type => (
                  <option key={type} value={type === 'All' ? '' : type}>
                    {type === 'male' ? 'Male Only' : type === 'female' ? 'Female Only' : type === 'unisex' ? 'Unisex' : 'All'}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Status</label>
              <select
                {...register('status')}
                onChange={(e) => onFilter({ status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] focus:outline-none transition-all duration-300"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status === 'All' ? '' : status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Max Price</label>
              <input
                {...register('maxPrice')}
                type="number"
                placeholder="Max rent amount"
                onChange={(e) => onFilter({ maxPrice: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#1E293B] placeholder-[#64748B] focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] focus:outline-none transition-all duration-300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Listings Component
const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch listings from API
  const fetchListings = async (searchFilters = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (searchFilters.search) params.set('search', searchFilters.search);
      if (searchFilters.propertyType) params.set('propertyType', searchFilters.propertyType);
      if (searchFilters.accommodationType) params.set('accommodationType', searchFilters.accommodationType);
      if (searchFilters.status) params.set('status', searchFilters.status);
      if (searchFilters.maxPrice) params.set('maxPrice', searchFilters.maxPrice);

      console.log('🔍 Frontend search filters:', searchFilters);
      console.log('🔍 API URL:', `${API_ENDPOINTS.LISTINGS}?${params.toString()}`);

      const response = await fetch(`${API_ENDPOINTS.LISTINGS}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setListings(data.data || []);
        setFilteredListings(data.data || []);
      } else {
        throw new Error(data.message || 'Failed to fetch listings');
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError(err.message);
      setListings([]);
      setFilteredListings([]);
    } finally {
      setLoading(false);
    }
  };

  // Initialize with URL parameters
  useEffect(() => {
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');
    const maxPrice = searchParams.get('maxPrice');

    const initialFilters = {};
    if (location) initialFilters.location = location;
    if (propertyType) initialFilters.propertyType = propertyType;
    if (maxPrice) initialFilters.maxPrice = maxPrice;

    // Set initial filters
    setFilters(initialFilters);

    // Fetch listings with initial filters
    fetchListings(initialFilters);
  }, []);

  // Handle search
  const handleSearch = (searchData) => {
    setSearchTerm(searchData.search || '');
    // Combine search with existing filters
    const combinedFilters = { ...filters, ...searchData };
    fetchListings(combinedFilters);
  };

  // Handle filters
  const handleFilter = (filterData) => {
    const newFilters = { ...filters, ...filterData };
    setFilters(newFilters);
    // Combine search term with filters
    const combinedFilters = { ...newFilters, search: searchTerm };
    fetchListings(combinedFilters);
  };

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1E293B] mb-4">Find Your Perfect Stay</h1>
          <p className="text-base lg:text-lg text-[#64748B]">
            Discover amazing properties in your area
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilters 
          onSearch={handleSearch} 
          onFilter={handleFilter}
          initialSearch={searchTerm}
        />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto"></div>
            <p className="mt-4 text-[#64748B]">Loading properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => fetchListings()}
              className="px-6 py-3 bg-[#2563EB] text-white rounded-xl hover:bg-[#1E40AF] transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && !error && (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-[#64748B]">
                Showing {filteredListings.length} properties
              </p>
            </div>

            {/* Properties Grid - Responsive */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-6">
               {filteredListings.map(property => (
                 <PropertyCard 
                   key={property._id} 
                   property={property} 
                 />
               ))}
             </div>
           ) : (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 mx-auto text-[#64748B] mb-4" />
              <p className="text-[#64748B]">
                No properties found matching your criteria
              </p>
            </div>
          )}
        </>
      )}
    </div>
  </div>
  );
};

export default Listings; 