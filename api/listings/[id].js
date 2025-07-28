import dbConnect from '../../../lib/dbConnect.js';
import Listing from '../../../lib/models/Listing.js';
import { uploadMultipleImages, deleteImage } from '../../../lib/cloudinary.js';

// Handle GET request - Get single listing by ID
const getListing = async (req, res) => {
  try {
    // Connect to database
    await dbConnect();

    const { id } = req.query;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Listing ID is required'
      });
    }

    // Find listing by ID
    const listing = await Listing.findById(id).lean();

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: listing
    });

  } catch (error) {
    console.error('Error fetching listing:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch listing',
      error: error.message
    });
  }
};

// Handle PUT request - Update listing
const updateListing = async (req, res) => {
  try {
    // Connect to database
    await dbConnect();

    const { id } = req.query;
    const updateData = req.body;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Listing ID is required'
      });
    }

    // Find existing listing
    const existingListing = await Listing.findById(id);
    if (!existingListing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Handle image uploads if present
    let newImages = [];
    if (req.files && req.files.length > 0) {
      // Convert files to base64 for Cloudinary
      const imagePromises = req.files.map(file => {
        const base64 = file.buffer.toString('base64');
        const dataURI = `data:${file.mimetype};base64,${base64}`;
        return uploadMultipleImages([dataURI], 'flatzzy');
      });

      const uploadResults = await Promise.all(imagePromises);
      
      // Extract successful uploads
      newImages = uploadResults
        .flat()
        .filter(result => result.success)
        .map(result => ({
          url: result.url,
          public_id: result.public_id,
          width: result.width,
          height: result.height
        }));
    }

    // Prepare update data
    const updateFields = {
      ...updateData,
      rent: updateData.rent ? parseFloat(updateData.rent) : undefined,
      offer: updateData.offer ? parseFloat(updateData.offer) : undefined,
      updatedAt: Date.now()
    };

    // Add new images to existing ones if any
    if (newImages.length > 0) {
      updateFields.images = [...existingListing.images, ...newImages];
    }

    // Update listing
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      data: updatedListing
    });

  } catch (error) {
    console.error('Error updating listing:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update listing',
      error: error.message
    });
  }
};

// Handle DELETE request - Delete listing
const deleteListing = async (req, res) => {
  try {
    // Connect to database
    await dbConnect();

    const { id } = req.query;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Listing ID is required'
      });
    }

    // Find listing to get image information
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Delete images from Cloudinary if they exist
    if (listing.images && listing.images.length > 0) {
      const deletePromises = listing.images.map(image => 
        deleteImage(image.public_id)
      );
      
      try {
        await Promise.all(deletePromises);
      } catch (cloudinaryError) {
        console.error('Error deleting images from Cloudinary:', cloudinaryError);
        // Continue with listing deletion even if image deletion fails
      }
    }

    // Delete listing from database
    await Listing.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Listing deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting listing:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete listing',
      error: error.message
    });
  }
};

// Main handler function
const handler = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Route based on HTTP method
  switch (req.method) {
    case 'GET':
      return getListing(req, res);
    
    case 'PUT':
      return updateListing(req, res);
    
    case 'DELETE':
      return deleteListing(req, res);
    
    default:
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed`
      });
  }
};

export default handler; 