import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Building2,
  Wifi,
  Snowflake,
  Car,
  UtensilsCrossed,
  Star,
  Heart,
  Share2,
  Phone,
  Mail
} from 'lucide-react';

// Property Card Component
const PropertyCard = ({ property, theme }) => {
  const amenitiesList = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'ac', label: 'AC', icon: Snowflake },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'food', label: 'Food', icon: UtensilsCrossed }
  ];

  return (
    <div className={`p-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl ${
      theme === 'dark' 
        ? 'bg-gray-800/50 border border-gray-700 hover:border-gray-600' 
        : 'bg-white border border-gray-200 hover:border-gray-300'
    }`}>
      {/* Property Image */}
      {property.images && property.images.length > 0 && (
        <div className="relative mb-4">
          <img
            src={property.images[0].url}
            alt={property.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
              <Heart className="w-4 h-4 text-red-500" />
            </button>
            <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
              <Share2 className="w-4 h-4 text-blue-500" />
            </button>
          </div>
          {property.status === 'rented' && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm">
              Rented
            </div>
          )}
        </div>
      )}

      {/* Property Details */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold mb-1">{property.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            {property.address}
          </div>
        </div>

        {/* Property Type and Price */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">{property.propertyType}</span>
          </div>
          {property.rent && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-semibold">₹{property.rent.toLocaleString()}</span>
              <span className="text-sm text-gray-500">/month</span>
            </div>
          )}
        </div>

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {property.amenities.map(amenity => {
              const amenityInfo = amenitiesList.find(a => a.id === amenity);
              if (!amenityInfo) return null;
              const Icon = amenityInfo.icon;
              return (
                <span key={amenity} className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
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
            <p className="text-sm font-medium mb-1">Nearby:</p>
            <div className="flex flex-wrap gap-1">
              {property.nearbyPlaces.slice(0, 3).map((place, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  {place}
                </span>
              ))}
              {property.nearbyPlaces.length > 3 && (
                <span className="text-xs text-gray-500">+{property.nearbyPlaces.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {property.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {property.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Phone className="w-4 h-4 inline mr-2" />
            Contact
          </button>
          <button className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
            <Mail className="w-4 h-4 inline mr-2" />
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

// Search and Filter Component
const SearchFilters = ({ onSearch, onFilter, theme }) => {
  const { register, handleSubmit, watch } = useForm();
  const [showFilters, setShowFilters] = useState(false);

  const onSubmit = (data) => {
    onSearch(data);
  };

  const propertyTypes = ['All', '1BHK', '2BHK', '3BHK', '4BHK', 'Studio', 'PG'];
  const statusOptions = ['All', 'available', 'rented', 'maintenance'];

  return (
    <div className={`p-6 rounded-lg shadow-lg mb-6 ${
      theme === 'dark' 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white border border-gray-200'
    }`}>
      {/* Search Bar */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            {...register('search')}
            type="text"
            placeholder="Search properties by name, address, or description..."
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>
      </form>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <Filter className="w-4 h-4" />
        Filters
      </button>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <select
                {...register('propertyType')}
                onChange={(e) => onFilter({ propertyType: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type === 'All' ? '' : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                {...register('status')}
                onChange={(e) => onFilter({ status: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
              <label className="block text-sm font-medium mb-2">Max Price</label>
              <input
                {...register('maxPrice')}
                type="number"
                placeholder="Max rent amount"
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
  const [theme, setTheme] = useState('light');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Fetch listings from API
  const fetchListings = async (searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Build query string
      const params = new URLSearchParams({
        page: searchParams.page || 1,
        limit: 12,
        ...filters,
        ...searchParams
      });

      const response = await fetch(`/api/listings?${params}`);
      const data = await response.json();

      if (data.success) {
        setListings(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.message || 'Failed to fetch listings');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchListings();
  }, [filters]);

  // Handle search
  const handleSearch = (searchData) => {
    const newFilters = { ...filters };
    if (searchData.search) {
      newFilters.search = searchData.search;
    }
    setFilters(newFilters);
    fetchListings({ search: searchData.search });
  };

  // Handle filters
  const handleFilter = (filterData) => {
    const newFilters = { ...filters, ...filterData };
    // Remove empty values
    Object.keys(newFilters).forEach(key => {
      if (!newFilters[key]) delete newFilters[key];
    });
    setFilters(newFilters);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    fetchListings({ page });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Home</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover amazing properties in your area
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilters 
          onSearch={handleSearch} 
          onFilter={handleFilter} 
          theme={theme} 
        />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => fetchListings()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              <p className="text-gray-600 dark:text-gray-400">
                Showing {listings.length} of {pagination.totalItems} properties
              </p>
            </div>

            {/* Properties Grid */}
            {listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map(property => (
                  <PropertyCard 
                    key={property._id} 
                    property={property} 
                    theme={theme} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No properties found matching your criteria
                </p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                
                <span className="px-4 py-2 text-sm">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Listings; 