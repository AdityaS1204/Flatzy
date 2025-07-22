import { generateToken } from '../../lib/utils/jwt';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request - Check if admin is logged in (optional)
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Auth check endpoint - use POST for login'
    });
  }

  // Handle POST request - Admin login
  if (req.method === 'POST') {
    try {
      // Extract login credentials from request body
      const { username, password } = req.body;

      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required'
        });
      }

      // Get admin credentials from environment variables
      const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

      // Debug logging
      console.log('🔍 Environment check:');
      console.log('👤 ADMIN_USERNAME exists:', !!ADMIN_USERNAME);
      console.log('🔑 ADMIN_PASSWORD exists:', !!ADMIN_PASSWORD);
      console.log('🎫 JWT_SECRET exists:', !!process.env.JWT_SECRET);

      // Check if environment variables are set
      if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
        console.error('❌ Missing environment variables');
        return res.status(500).json({
          success: false,
          message: 'Server configuration error - missing environment variables'
        });
      }

      console.log('🔍 Checking credentials...');
      console.log('👤 Input username:', username);
      console.log('🔑 Expected username:', ADMIN_USERNAME);

      // Check if credentials match
      if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        console.log('❌ Invalid credentials');
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      console.log('✅ Credentials valid!');

      // Create admin payload for JWT
      const adminPayload = {
        id: 'admin',
        username: username,
        role: 'admin',
        lastLogin: new Date().toISOString()
      };

      // Generate JWT token
      const token = generateToken(adminPayload);

      console.log('🎫 Token generated successfully');

      // Return success response with token
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          admin: {
            id: 'admin',
            username: username,
            role: 'admin',
            lastLogin: new Date().toISOString()
          },
          token,
          expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        }
      });

    } catch (error) {
      console.error('💥 Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message
      });
    }
  }

  // Handle unsupported methods
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`
  });
} 