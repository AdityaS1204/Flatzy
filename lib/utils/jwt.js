import jwt from 'jsonwebtoken';

// JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate JWT token for admin
 * @param {Object} payload - Token payload (admin data)
 * @returns {string} JWT token
 */
export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'flatzzy-admin',
      audience: 'flatzzy-users'
    });
  } catch (error) {
    throw new Error('Token generation failed');
  }
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error('Token verification failed');
    }
  }
};

/**
 * Decode JWT token without verification (for reading payload)
 * @param {string} token - JWT token to decode
 * @returns {Object} Decoded token payload
 */
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error('Token decoding failed');
  }
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header
 * @returns {string|null} Token or null if not found
 */
export const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7); // Remove 'Bearer ' prefix
};

/**
 * Create admin payload for JWT
 * @param {Object} admin - Admin object
 * @returns {Object} Payload for JWT
 */
export const createAdminPayload = (admin) => {
  return {
    id: admin._id,
    username: admin.username,
    email: admin.email,
    role: admin.role
  };
}; 