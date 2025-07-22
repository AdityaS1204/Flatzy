import React, { useState, useEffect } from 'react';
import { 
  DashboardLayout, 
  DashboardHeader, 
  PropertyForm, 
  PropertyList 
} from '../Components';
import { API_ENDPOINTS } from '../config/api.js';

const AdminDashboard = ({ onLogout, adminData }) => {
  const [theme, setTheme] = useState('light');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('admin-theme', theme);
  }, [theme]);

  // Test API connection on component mount
  useEffect(() => {
    testAPIConnection();
    fetchProperties();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Test API connection
  const testAPIConnection = async () => {
    try {
      console.log('🔍 Testing API connection...');
      console.log('🌐 API URL:', API_ENDPOINTS.LISTINGS);
      
      // Test database connection by fetching listings
      const response = await fetch(API_ENDPOINTS.LISTINGS, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ API connection successful!');
        console.log('📊 Database connected and working');
        console.log('📋 Current listings count:', data.data?.length || 0);
      } else {
        console.error('❌ API connection failed:', data.message);
      }
    } catch (error) {
      console.error('💥 API connection error:', error);
      setError('Failed to connect to API');
    }
  };

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      setLoading(true);
      console.log('📥 Fetching properties from API...');
      console.log('🌐 API URL:', API_ENDPOINTS.LISTINGS);
      
      const response = await fetch(API_ENDPOINTS.LISTINGS, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Properties fetched successfully!');
        console.log('📋 Properties count:', data.data.length);
        setProperties(data.data);
      } else {
        console.error('❌ Failed to fetch properties:', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('💥 Fetch properties error:', error);
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = (newProperty) => {
    console.log('🆕 New property added to state:', newProperty);
    setProperties(prev => [newProperty, ...prev]);
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      console.log('🗑️ Deleting property:', propertyId);
      console.log('🌐 API URL:', API_ENDPOINTS.LISTING_BY_ID(propertyId));
      
      const response = await fetch(API_ENDPOINTS.LISTING_BY_ID(propertyId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Property deleted successfully!');
        setProperties(prev => prev.filter(property => property._id !== propertyId));
      } else {
        console.error('❌ Failed to delete property:', data.message);
      }
    } catch (error) {
      console.error('💥 Delete property error:', error);
    }
  };

  return (
    <DashboardLayout theme={theme}>
      <DashboardHeader theme={theme} toggleTheme={toggleTheme} onLogout={onLogout} adminData={adminData} />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Connection Status */}
        <div className="mb-6">
          <div className={`p-4 rounded-lg ${
            error 
              ? 'bg-red-100 text-red-800 border border-red-200' 
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}>
            <h3 className="font-semibold mb-2">Connection Status:</h3>
            {error ? (
              <p>❌ {error}</p>
            ) : (
              <p>✅ Connected to Database and Cloudinary</p>
            )}
            <button 
              onClick={testAPIConnection}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Test Connection
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PropertyForm onAddProperty={handleAddProperty} theme={theme} />
          </div>
          <div>
            <PropertyList 
              properties={properties} 
              onDelete={handleDeleteProperty} 
              theme={theme} 
              loading={loading}
            />
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default AdminDashboard;