import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AdminLogin = ({ onLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Dummy credentials - you can change these or use environment variables
  const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME ;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError("");
      setSuccess("");

      console.log("🔐 Attempting login...");

      console.log("👤 Input username:", data.username);
      console.log("🔑 Expected username:", ADMIN_USERNAME);

      // Check credentials
      if (data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD) {
        console.log("✅ Login successful!");
        
        setSuccess("Login successful! Redirecting...");
        
        // Call the onLogin callback with dummy admin data
        if (onLogin) {
          onLogin({
            admin: {
              id: 'admin',
              username: data.username,
              role: 'admin',
              lastLogin: new Date().toISOString()
            },
            token: 'dummy-token-for-mvp',
            expiresIn: '7d'
          });
        }
      } else {
        console.error("❌ Invalid credentials");
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("💥 Login error:", error);
      setError(`Login error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Admin Login
        </h2>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg border border-green-200 text-sm sm:text-base">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg border border-red-200 text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-800 mb-1 text-sm sm:text-base" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username", { required: "Username is required" })}
            className={`w-full px-3 sm:px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            } bg-gray-50 text-gray-800 text-sm sm:text-base`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 mb-1 text-sm sm:text-base" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-3 sm:px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            } bg-gray-50 text-gray-800 text-sm sm:text-base`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        
        {/* Dummy credentials hint for MVP */}
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-xs">
          <strong>MVP Credentials:</strong><br/>
          Username: <code>{ADMIN_USERNAME}</code><br/>
          Password: <code>{ADMIN_PASSWORD}</code>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;