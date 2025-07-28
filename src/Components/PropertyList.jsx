import React from 'react';
import { Home } from 'lucide-react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, onDelete, theme, loading = false }) => {
  return (
    <div className={`p-4 sm:p-6 rounded-lg shadow-lg ${
      theme === 'dark' 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white border border-gray-200'
    }`}>
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
        <Home className="w-4 h-4 sm:w-5 sm:h-5" />
        Property Listings ({properties.length})
      </h2>
      
      {loading ? (
        <div className="text-center py-8 sm:py-12">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Loading properties...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Home className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-gray-400 mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-gray-500">No properties added yet. Add your first property using the form.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-6">
          {properties.map(property => (
            <PropertyCard
              key={property._id}
              property={property}
              onDelete={onDelete}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList; 