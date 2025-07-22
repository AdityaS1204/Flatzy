# Flatzzy Serverless API Documentation

A comprehensive Vercel-compatible serverless API for the Flatzzy property management system.

## 🏗️ **API Structure**

```
flatzzy/
├── lib/
│   ├── dbConnect.js          # MongoDB Atlas connection
│   ├── cloudinary.js         # Cloudinary image upload/management
│   ├── models/
│   │   ├── Listing.js        # Property listing model
│   │   └── Admin.js          # Admin user model
│   ├── utils/
│   │   └── jwt.js            # JWT token utilities
│   └── middleware/
│       └── auth.js           # Authentication middleware
├── api/
│   ├── listings/
│   │   ├── index.js          # GET/POST listings
│   │   └── [id].js           # GET/PUT/DELETE single listing
│   └── auth/
│       ├── login.js          # Admin login
│       └── verify.js         # JWT token verification
└── src/
    └── Pages/
        └── Listings.jsx      # Frontend listings page
```

## 🔧 **Environment Variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flatzzy

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
```

## 📊 **Database Models**

### Listing Model
- **Basic Info**: name, owner, address
- **Pricing**: rent, offer
- **Property Details**: propertyType, amenities, nearbyPlaces
- **Media**: images (Cloudinary URLs)
- **Status**: available, rented, maintenance
- **Timestamps**: createdAt, updatedAt

### Admin Model
- **Credentials**: username, password (hashed), email
- **Role**: admin, super_admin
- **Status**: isActive, lastLogin
- **Security**: bcrypt password hashing

## 🚀 **API Endpoints**

### Listings API

#### `GET /api/listings`
**Get all listings with filtering and pagination**

Query Parameters:
- `search` - Search in name, address, description
- `propertyType` - Filter by property type
- `status` - Filter by status
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (default: desc)

**Response:**
```json
{
  "success": true,
  "data": [...listings],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "hasNextPage": true,
    "hasPrevPage": false,
    "itemsPerPage": 10
  }
}
```

#### `POST /api/listings`
**Add new listing (requires authentication)**

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body (multipart/form-data):**
```json
{
  "name": "Property Name",
  "owner": "Owner Name",
  "address": "Property Address",
  "rent": 15000,
  "offer": 14000,
  "propertyType": "2BHK",
  "amenities": ["wifi", "ac", "parking"],
  "nearbyPlaces": ["Mall", "Hospital", "School"],
  "description": "Beautiful property...",
  "status": "available",
  "images": [File1, File2, ...]
}
```

#### `GET /api/listings/[id]`
**Get single listing by ID**

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Property Name",
    "owner": "Owner Name",
    "address": "Property Address",
    "rent": 15000,
    "propertyType": "2BHK",
    "amenities": ["wifi", "ac"],
    "images": [
      {
        "url": "https://res.cloudinary.com/...",
        "public_id": "flatzzy/...",
        "width": 1000,
        "height": 800
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### `PUT /api/listings/[id]`
**Update listing (requires authentication)**

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:** Same as POST, but all fields are optional

#### `DELETE /api/listings/[id]`
**Delete listing (requires authentication)**

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Authentication API

#### `POST /api/auth/login`
**Admin login**

**Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": "...",
      "username": "admin",
      "email": "admin@flatzzy.com",
      "role": "admin",
      "lastLogin": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "7d"
  }
}
```

#### `POST /api/auth/verify`
**Verify JWT token**

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "admin": {
      "id": "...",
      "username": "admin",
      "email": "admin@flatzzy.com",
      "role": "admin"
    },
    "iat": 1704067200,
    "exp": 1704672000
  }
}
```

## 🖼️ **Image Upload**

### Cloudinary Integration
- **Automatic Optimization**: Images are automatically resized and optimized
- **Multiple Formats**: Supports WebP for modern browsers
- **Secure URLs**: All images use HTTPS
- **Folder Organization**: Images are stored in 'flatzzy' folder

### Upload Process
1. Images are converted to base64
2. Uploaded to Cloudinary with transformations
3. URLs and public_ids stored in MongoDB
4. Automatic cleanup on deletion

## 🔐 **Authentication & Security**

### JWT Token Management
- **Token Generation**: Uses admin payload for JWT
- **Token Verification**: Middleware for protected routes
- **Token Expiration**: Configurable (default: 7 days)
- **Secure Headers**: Bearer token authentication

### Password Security
- **bcrypt Hashing**: 12 salt rounds for passwords
- **Password Comparison**: Secure comparison method
- **Account Status**: Active/inactive account management

## 🎨 **Frontend Integration**

### Listings Page Features
- **Search Functionality**: Real-time search across properties
- **Advanced Filters**: Property type, status, price range
- **Responsive Design**: Works on all screen sizes
- **Dark/Light Mode**: Theme support
- **Pagination**: Load more properties
- **Property Cards**: Beautiful property display

### API Integration
```javascript
// Fetch listings with filters
const fetchListings = async (searchParams = {}) => {
  const params = new URLSearchParams({
    page: 1,
    limit: 12,
    ...searchParams
  });

  const response = await fetch(`/api/listings?${params}`);
  const data = await response.json();
  
  if (data.success) {
    setListings(data.data);
    setPagination(data.pagination);
  }
};
```

## 🚀 **Deployment**

### Vercel Deployment
1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Environment Variables**: Add all required env vars in Vercel dashboard
3. **Build Settings**: Vercel automatically detects Next.js/React
4. **API Routes**: Serverless functions are automatically deployed

### Environment Setup
```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build
```

## 📝 **Usage Examples**

### Creating a Listing (Admin)
```javascript
const formData = new FormData();
formData.append('name', 'Beautiful 2BHK');
formData.append('owner', 'John Doe');
formData.append('address', '123 Main Street');
formData.append('rent', '15000');
formData.append('propertyType', '2BHK');
formData.append('amenities', JSON.stringify(['wifi', 'ac']));
formData.append('images', imageFile);

const response = await fetch('/api/listings', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

### Searching Listings (Public)
```javascript
const response = await fetch('/api/listings?search=2BHK&propertyType=2BHK&page=1&limit=12');
const data = await response.json();
```

### Admin Login
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'password123'
  })
});

const data = await response.json();
const token = data.data.token;
```

## 🔧 **Error Handling**

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

## 🛡️ **Security Features**

- **CORS Support**: Cross-origin requests handled
- **Input Validation**: All inputs validated and sanitized
- **SQL Injection Protection**: Mongoose provides protection
- **XSS Protection**: Proper content-type headers
- **Rate Limiting**: Can be added with Vercel Edge Functions

## 📊 **Performance Features**

- **Database Indexing**: Optimized queries with indexes
- **Image Optimization**: Cloudinary automatic optimization
- **Pagination**: Efficient data loading
- **Caching**: Can be implemented with Redis
- **CDN**: Cloudinary provides global CDN

The API is production-ready and follows best practices for security, performance, and maintainability! 