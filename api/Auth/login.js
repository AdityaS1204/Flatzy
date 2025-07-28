export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Auth check endpoint - use POST for login'
    });
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      // Simple validation
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required'
        });
      }

      // Get environment variables
      const ADMIN_USERNAME = process.env.VITE_ADMIN_USERNAME ;
      const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD ;

      console.log('🔍 Checking credentials...');
      console.log('👤 Input username:', username);
      console.log('🔑 Expected username:', ADMIN_USERNAME);

      // Check credentials
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        console.log('✅ Login successful!');
        
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
            token: 'dummy-token-for-testing',
            expiresIn: '7d'
          }
        });
      } else {
        console.log('❌ Invalid credentials');
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

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