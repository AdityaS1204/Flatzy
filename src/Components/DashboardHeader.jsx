import React from 'react';
import { Moon, Sun, LogOut, User } from 'lucide-react';

const DashboardHeader = ({ theme, toggleTheme, onLogout, adminData }) => {
  return (
    <header className={`p-4 sm:p-6 border-b ${
      theme === 'dark' 
        ? 'bg-gray-900/50 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Admin Dashboard
          </h1>
          {adminData && (
            <p className={`text-xs sm:text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            } flex items-center gap-1 mt-1`}>
              <User className="w-3 h-3" />
              Logged in as: {adminData.username}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 