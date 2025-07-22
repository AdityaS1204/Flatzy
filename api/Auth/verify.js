import { verifyToken, extractTokenFromHeader } from '../../lib/utils/jwt.js';

// Handle POST request - Verify JWT token
const verifyTokenHandler = async (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Return decoded token information
    return res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: {
        admin: {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role
        },
        iat: decoded.iat, // Issued at
        exp: decoded.exp   // Expires at
      }
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || 'Invalid token'
    });
  }
};

// Handle GET request - Simple token check
const checkToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Just verify the token without returning details
    verifyToken(token);

    return res.status(200).json({
      success: true,
      message: 'Token is valid'
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
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
      return checkToken(req, res);
    
    case 'POST':
      return verifyTokenHandler(req, res);
    
    default:
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed`
      });
  }
};

export default handler; 