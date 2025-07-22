import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_ENDPOINTS } from '../config/api.js';
import { 
  Plus, 
  Wifi, 
  Snowflake, 
  Car, 
  UtensilsCrossed,
  Building2,
  MapPin,
  Upload
} from 'lucide-react';

const PropertyForm = ({ onAddProperty, theme }) => {
  const [nearbyPlace, setNearbyPlace] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      owner: '',
      address: '',
      rent: '',
      offer: '',
      propertyType: '1BHK',
      amenities: [],
      nearbyPlaces: [],
      description: ''
    }
  });

  const propertyTypes = ['1BHK', '2BHK', '3BHK', '4BHK', 'Studio', 'PG'];
  const amenitiesList = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'ac', label: 'AC', icon: Snowflake },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'food', label: 'Food', icon: UtensilsCrossed },
    { id: 'furnished', label: 'Furnished', icon: Building2 }
  ];

  const watchedAmenities = watch('amenities') || [];

  const handleAmenityToggle = (amenityId) => {
    const currentAmenities = watchedAmenities;
    const newAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(id => id !== amenityId)
      : [...currentAmenities, amenityId];
    setValue('amenities', newAmenities);
  };

  const handleAddNearbyPlace = () => {
    if (nearbyPlace.trim() && !watch('nearbyPlaces').includes(nearbyPlace.trim())) {
      const currentPlaces = watch('nearbyPlaces') || [];
      setValue('nearbyPlaces', [...currentPlaces, nearbyPlace.trim()]);
      setNearbyPlace('');
    }
  };

  const handleRemoveNearbyPlace = (place) => {
    const currentPlaces = watch('nearbyPlaces') || [];
    setValue('nearbyPlaces', currentPlaces.filter(p => p !== place));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    console.log('📸 Images selected:', files.length, 'files');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    setImages(prev => [...prev, ...files]);
    console.log('📸 Images dropped:', files.length, 'files');
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitMessage('');

      console.log('🚀 Starting property submission...');
      console.log('📋 Form data:', data);
      console.log('📸 Images to upload:', images.length);
      console.log('🌐 API URL:', API_ENDPOINTS.LISTINGS);

      // Validate required fields
      if (!data.name || !data.owner || !data.address) {
        setSubmitMessage('❌ Please fill in all required fields');
        return;
      }

      // Create FormData for multipart/form-data submission
      const formData = new FormData();
      
      // Add form fields
      formData.append('name', data.name);
      formData.append('owner', data.owner);
      formData.append('address', data.address);
      formData.append('propertyType', data.propertyType);
      formData.append('description', data.description || '');
      
      if (data.rent) formData.append('rent', data.rent);
      if (data.offer) formData.append('offer', data.offer);
      
      // Add amenities as JSON string
      if (data.amenities && data.amenities.length > 0) {
        formData.append('amenities', JSON.stringify(data.amenities));
      }
      
      // Add nearby places as JSON string
      if (data.nearbyPlaces && data.nearbyPlaces.length > 0) {
        formData.append('nearbyPlaces', JSON.stringify(data.nearbyPlaces));
      }

      // Add images
      images.forEach((image, index) => {
        formData.append('images', image);
        console.log(`📤 Adding image ${index + 1}:`, image.name);
      });

      console.log('🌐 Sending request to API...');

      // Send to API
      const response = await fetch(API_ENDPOINTS.LISTINGS, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      console.log('📡 API Response status:', response.status);

      const result = await response.json();
      console.log('📡 API Response:', result);

      if (result.success) {
        console.log('✅ Property added successfully!');
        console.log('📊 Database ID:', result.data._id);
        console.log('🖼️ Cloudinary URLs:', result.data.images?.map(img => img.url));
        
        setSubmitMessage('✅ Property added successfully!');
        
        // Reset form
        reset();
        setImages([]);
        setNearbyPlace('');
        
        // Update parent component
        if (onAddProperty) {
          onAddProperty(result.data);
        }
      } else {
        console.error('❌ API Error:', result.message);
        setSubmitMessage(`❌ Error: ${result.message}`);
      }

    } catch (error) {
      console.error('💥 Submission error:', error);
      setSubmitMessage(`❌ Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${
      theme === 'dark' 
        ? 'bg-gray-800/50 border border-gray-700' 
        : 'bg-white border border-gray-200'
    }`}>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5" />
        Add New Property
      </h2>
      
      {/* Status Message */}
      {submitMessage && (
        <div className={`mb-4 p-3 rounded-lg ${
          submitMessage.startsWith('✅') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {submitMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Property Name</label>
            <input
              type="text"
              {...register("name", { required: "Property name is required" })}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.name 
                  ? 'border-red-500' 
                  : theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter property name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Owner</label>
            <input
              type="text"
              {...register("owner", { required: "Owner name is required" })}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.owner 
                  ? 'border-red-500' 
                  : theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter owner name"
            />
            {errors.owner && (
              <p className="text-red-500 text-sm mt-1">{errors.owner.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className={`w-full px-3 py-2 rounded-lg border ${
              errors.address 
                ? 'border-red-500' 
                : theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Enter property address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rent (₹)</label>
            <input
              type="number"
              {...register("rent")}
              className={`w-full px-3 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Monthly rent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Offer Price (₹)</label>
            <input
              type="number"
              {...register("offer")}
              className={`w-full px-3 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Offer price"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Property Type</label>
          <select
            {...register("propertyType")}
            className={`w-full px-3 py-2 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {amenitiesList.map(amenity => {
              const Icon = amenity.icon;
              return (
                <label key={amenity.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={watchedAmenities.includes(amenity.id)}
                    onChange={() => handleAmenityToggle(amenity.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{amenity.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Nearby Places */}
        <div>
          <label className="block text-sm font-medium mb-2">Nearby Places</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={nearbyPlace}
              onChange={(e) => setNearbyPlace(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNearbyPlace())}
              className={`flex-1 px-3 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Add nearby place"
            />
            <button
              type="button"
              onClick={handleAddNearbyPlace}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(watch('nearbyPlaces') || []).map((place, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <MapPin className="w-3 h-3" />
                {place}
                <button
                  type="button"
                  onClick={() => handleRemoveNearbyPlace(place)}
                  className="ml-1 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className={`w-full px-3 py-2 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Enter property description"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Images</label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : theme === 'dark' 
                  ? 'border-gray-600 bg-gray-700/50' 
                  : 'border-gray-300 bg-gray-50'
            }`}
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 mb-2">
              Drag and drop images here, or click to select
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Select Images
            </label>
          </div>
          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
              {images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Property ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding Property..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm; 