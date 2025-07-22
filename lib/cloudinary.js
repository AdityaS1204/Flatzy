import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {Buffer|string} file - Image file buffer or base64 string
 * @param {string} folder - Folder name in Cloudinary (optional)
 * @returns {Promise<Object>} Upload result with URL and public_id
 */
export const uploadImage = async (file, folder = 'flatzzy') => {
  try {
    // Upload options
    const uploadOptions = {
      folder: folder,
      resource_type: 'auto', // Automatically detect file type
      transformation: [
        { width: 1000, height: 1000, crop: 'limit' }, // Resize large images
        { quality: 'auto' }, // Optimize quality
        { fetch_format: 'auto' } // Auto format (webp for modern browsers)
      ]
    };

    // Upload the image
    const result = await cloudinary.uploader.upload(file, uploadOptions);
    
    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} public_id - Public ID of the image to delete
 * @returns {Promise<Object>} Deletion result
 */
export const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    
    return {
      success: true,
      result: result
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param {Array} files - Array of image files
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<Array>} Array of upload results
 */
export const uploadMultipleImages = async (files, folder = 'flatzzy') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    const results = await Promise.all(uploadPromises);
    
    return results;
  } catch (error) {
    console.error('Multiple image upload error:', error);
    return [{
      success: false,
      error: error.message
    }];
  }
};

export default cloudinary; 