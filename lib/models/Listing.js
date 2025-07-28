import mongoose from 'mongoose';

// Define the listing schema
const listingSchema = new mongoose.Schema({
  // Basic property information
  name: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true,
    maxlength: [100, 'Property name cannot exceed 100 characters']
  },
  owner: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },

  // Pricing information
  rent: {
    type: Number,
    min: [0, 'Rent cannot be negative']
  },
  offer: {
    type: Number,
    min: [0, 'Offer price cannot be negative']
  },

  // Property details
  propertyType: {
    type: String,
    enum: ['1BHK', '2BHK', '3BHK', '4BHK', 'Studio', 'PG'],
    default: '1BHK'
  },

  // Accommodation type for PG/Shared properties
  accommodationType: {
    type: String,
    enum: ['male', 'female', 'unisex'],
    default: 'unisex'
  },

  // Amenities array
  amenities: [{
    type: String,
    enum: ['wifi', 'ac', 'parking', 'food', 'furnished']
  }],

  // Nearby places
  nearbyPlaces: [{
    type: String,
    trim: true
  }],

  // Description
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },

  // Images - store Cloudinary URLs and public_ids
  images: [{
    url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    },
    width: Number,
    height: Number
  }],

  // Status and metadata
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance'],
    default: 'available'
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Enable timestamps
  timestamps: true,
  
  // Add virtual fields for better data access
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for formatted rent
listingSchema.virtual('formattedRent').get(function() {
  return this.rent ? `₹${this.rent.toLocaleString()}` : 'Not specified';
});

// Virtual field for formatted offer
listingSchema.virtual('formattedOffer').get(function() {
  return this.offer ? `₹${this.offer.toLocaleString()}` : 'Not specified';
});

// Index for better search performance
listingSchema.index({ name: 'text', address: 'text', description: 'text' });
listingSchema.index({ propertyType: 1 });
listingSchema.index({ accommodationType: 1 });
listingSchema.index({ status: 1 });
listingSchema.index({ createdAt: -1 });

// Pre-save middleware to update the updatedAt field
listingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to search listings
listingSchema.statics.searchListings = function(query) {
  return this.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { address: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } }
    ]
  }).sort({ createdAt: -1 });
};

// Static method to get listings by property type
listingSchema.statics.getByPropertyType = function(propertyType) {
  return this.find({ propertyType }).sort({ createdAt: -1 });
};

// Static method to get available listings
listingSchema.statics.getAvailable = function() {
  return this.find({ status: 'available' }).sort({ createdAt: -1 });
};

// Export the model
const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);

export default Listing; 