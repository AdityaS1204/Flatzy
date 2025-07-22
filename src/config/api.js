// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin);

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/Auth/login`,
  VERIFY: `${API_BASE_URL}/api/Auth/verify`,
  
  // Listings endpoints
  LISTINGS: `${API_BASE_URL}/api/listings`,
  LISTING_BY_ID: (id) => `${API_BASE_URL}/api/listings/${id}`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_ENDPOINTS; 