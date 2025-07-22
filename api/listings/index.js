import dbConnect from '../../lib/dbConnect.js';
import Listing from '../../lib/models/Listing.js';
import { uploadMultipleImages } from '../../lib/cloudinary.js';
import { authenticateAdmin } from '../../lib/middleware/auth.js';

// Handle GET request - Get all listings
const getListings = async (req, res) => {
  try {
    // Connect to database
    await dbConnect();

    // Get query parameters for filtering and pagination
    const { 
      search, 
      propertyType, 
      status, 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    // Add search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Add property type filter
    if (propertyType) {
      filter.propertyType = propertyType;
    }

    // Add status filter
    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const listings = await Listing.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Listing.countDocuments(filter);

    // Calculate pagination info
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return res.status(200).json({
      success: true,
      data: listings,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        hasNextPage,
        hasPrevPage,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Error fetching listings:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch listings',
      error: error.message
    });
  }
};

// Handle POST request - Add new listing
const addListing = async (req, res) => {
  try {
    // Connect to database
    await dbConnect();

    // Extract listing data from request body
    const {
      name,
      owner,
      address,
      rent,
      offer,
      propertyType,
      amenities,
      nearbyPlaces,
      description,
      status = 'available'
    } = req.body;

    // Validate required fields
    if (!name || !owner || !address) {
      return res.status(400).json({
        success: false,
        message: 'Name, owner, and address are required'
      });
    }

    // Handle image uploads if present
    let images = [];
    if (req.files && req.files.length > 0) {
      // Convert files to base64 for Cloudinary
      const imagePromises = req.files.map(file => {
        const base64 = file.buffer.toString('base64');
        const dataURI = `data:${file.mimetype};base64,${base64}`;
        return uploadMultipleImages([dataURI], 'flatzzy');
      });

      const uploadResults = await Promise.all(imagePromises);
      
      // Extract successful uploads
      images = uploadResults
        .flat()
        .filter(result => result.success)
        .map(result => ({
          url: result.url,
          public_id: result.public_id,
          width: result.width,
          height: result.height
        }));
    }

    // Create new listing
    const newListing = new Listing({
      name,
      owner,
      address,
      rent: rent ? parseFloat(rent) : undefined,
      offer: offer ? parseFloat(offer) : undefined,
      propertyType,
      amenities: amenities || [],
      nearbyPlaces: nearbyPlaces || [],
      description,
      status,
      images
    });

    // Save to database
    const savedListing = await newListing.save();

    return res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      data: savedListing
    });

  } catch (error) {
    console.error('Error creating listing:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create listing',
      error: error.message
    });
  }
};

// Main handler function
const handler = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Route based on HTTP method
  switch (req.method) {
    case 'GET':
      return getListings(req, res);
    
    case 'POST':
      // Apply authentication middleware for POST
      return authenticateAdmin(req, res, () => addListing(req, res));
    
    default:
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed`
      });
  }
};

export default handler; 