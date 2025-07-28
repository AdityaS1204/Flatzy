import dbConnect from '../../lib/dbConnect.js';
import Listing from '../../lib/models/Listing.js';
import { uploadMultipleImages } from '../../lib/cloudinary.js';

// Simple multipart form data parser for serverless environments
const parseMultipartData = async (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const buffer = Buffer.concat(chunks);
        const contentType = req.headers['content-type'];
        
        // If no content type or not multipart, try JSON first
        if (!contentType || !contentType.includes('multipart/form-data')) {
          try {
            const body = JSON.parse(buffer.toString());
            req.body = body;
            req.files = [];
            resolve();
            return;
          } catch (jsonError) {
            // If JSON parsing fails, treat as form data
            const formData = {};
            const queryString = buffer.toString();
            const pairs = queryString.split('&');
            
            pairs.forEach(pair => {
              const [key, value] = pair.split('=');
              if (key && value) {
                formData[decodeURIComponent(key)] = decodeURIComponent(value);
              }
            });
            
            req.body = formData;
            req.files = [];
            resolve();
            return;
          }
        }
        
        // Handle multipart form data
        const boundary = contentType.split('boundary=')[1];
        if (!boundary) {
          reject(new Error('No boundary found in multipart content type'));
          return;
        }
        
        const parts = buffer.toString('binary').split(`--${boundary}`);
        
        const formData = {};
        const files = [];
        
        parts.forEach(part => {
          if (part.includes('Content-Disposition: form-data')) {
            const lines = part.split('\r\n');
            let name = '';
            let value = '';
            let filename = '';
            let contentType = '';
            let dataStart = false;
            let fileData = [];
            
            lines.forEach(line => {
              if (line.startsWith('Content-Disposition: form-data; name=')) {
                const nameMatch = line.match(/name="([^"]+)"/);
                if (nameMatch) {
                  name = nameMatch[1];
                }
                const filenameMatch = line.match(/filename="([^"]+)"/);
                if (filenameMatch) {
                  filename = filenameMatch[1];
                }
              } else if (line.startsWith('Content-Type:')) {
                contentType = line.split(': ')[1];
              } else if (line === '') {
                dataStart = true;
              } else if (dataStart && line !== '--' && line !== '') {
                if (filename) {
                  fileData.push(line);
                } else {
                  value += line;
                }
              }
            });
            
            if (filename && fileData.length > 0) {
              // Handle file
              const fileBuffer = Buffer.from(fileData.join('\r\n'), 'binary');
              files.push({
                fieldname: name,
                originalname: filename,
                mimetype: contentType,
                buffer: fileBuffer
              });
            } else if (name) {
              // Handle form field
              formData[name] = value;
            }
          }
        });
        
        req.body = formData;
        req.files = files;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
};

// Handle GET request - Get all listings
const getListings = async (req, res) => {
  try {
    // Connect to database
    await dbConnect();

    // Get query parameters for filtering and pagination
    const { 
      search, 
      propertyType, 
      accommodationType,
      status,
      maxPrice,
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    console.log('🔍 Query parameters:', { search, propertyType, accommodationType, status, maxPrice });
    
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

    // Add accommodation type filter
    if (accommodationType) {
      filter.accommodationType = accommodationType;
    }

    // Add status filter
    if (status) {
      filter.status = status;
    }

    // Add max price filter
    if (maxPrice) {
      const priceFilter = {
        $or: [
          { rent: { $lte: parseInt(maxPrice) } },
          { offer: { $lte: parseInt(maxPrice) } }
        ]
      };
      
      // If we already have a search filter, combine them with $and
      if (filter.$or) {
        filter.$and = [
          { $or: filter.$or },
          priceFilter
        ];
        delete filter.$or;
      } else {
        Object.assign(filter, priceFilter);
      }
    }
    
    console.log('🔍 Final filter object:', JSON.stringify(filter, null, 2));

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
      accommodationType,
      amenities,
      nearbyPlaces,
      description,
      status = 'available'
    } = req.body;

    // Parse JSON fields that come as strings from FormData
    let parsedAmenities = [];
    let parsedNearbyPlaces = [];

    try {
      if (amenities) {
        parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
      }
      if (nearbyPlaces) {
        parsedNearbyPlaces = typeof nearbyPlaces === 'string' ? JSON.parse(nearbyPlaces) : nearbyPlaces;
      }
    } catch (parseError) {
      console.error('Error parsing JSON fields:', parseError);
      // Use empty arrays if parsing fails
      parsedAmenities = [];
      parsedNearbyPlaces = [];
    }

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
      accommodationType: accommodationType || 'unisex',
      amenities: parsedAmenities,
      nearbyPlaces: parsedNearbyPlaces,
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
      // Only parse multipart data if content type indicates it
      const contentType = req.headers['content-type'];
      if (contentType && contentType.includes('multipart/form-data')) {
        return parseMultipartData(req).then(() => {
          // No authentication required for adding listings
          return addListing(req, res);
        }).catch(err => {
          console.error('Error parsing multipart form data:', err);
          return res.status(400).json({
            success: false,
            message: 'File upload error',
            error: err.message
          });
        });
      } else {
        // Let Vercel handle JSON parsing automatically
        // No authentication required for adding listings
        return addListing(req, res);
      }
    
    default:
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed`
      });
  }
};

export default handler; 