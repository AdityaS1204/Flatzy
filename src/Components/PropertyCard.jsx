import React from 'react';
import { 
  Trash2, 
  MapPin, 
  DollarSign, 
  Wifi, 
  Snowflake, 
  Car, 
  UtensilsCrossed,
  Building2
} from 'lucide-react';

const PropertyCard = ({ property, onDelete, theme }) => {
  const amenitiesList = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'ac', label: 'AC', icon: Snowflake },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'food', label: 'Food', icon: UtensilsCrossed },
    { id: 'furnished', label: 'Furnished', icon: Building2 }
  ];

  return (
    <div className={`p-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl ${
      theme === 'dark' 
        ? 'bg-gray-800/50 border border-gray-700 hover:border-gray-600' 
        : 'bg-white border border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{property.name}</h3>
          <p className="text-sm text-gray-500 mb-2">Owner: {property.owner}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            {property.address}
          </div>
        </div>
        <button
          onClick={() => onDelete(property._id)}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span className="text-sm">{property.propertyType}</span>
        </div>
        {property.rent && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm">₹{property.rent.toLocaleString()}/month</span>
          </div>
        )}
      </div>

      {property.amenities && property.amenities.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Amenities:</p>
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
        </div>
      )}

      {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Nearby:</p>
          <div className="flex flex-wrap gap-1">
            {property.nearbyPlaces.map((place, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                {place}
              </span>
            ))}
          </div>
        </div>
      )}

      {property.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {property.description}
        </p>
      )}

      {property.images && property.images.length > 0 && (
        <div className="mt-4">
          <img
            src={property.images[0].url}
            alt={property.name}
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Property Status */}
      {property.status && (
        <div className="mt-3">
          <span className={`text-xs px-2 py-1 rounded-full ${
            property.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : property.status === 'rented'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
      )}
    </div>
  );
};

export default PropertyCard; 