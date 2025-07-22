import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS } from '../config/api';

const AdminLogin = ({ onLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        throw new Error(`Server returned non-JSON response: ${response.status}`);
      }

      const result = await response.json();
      console.log("Login response:", result);

      if (result.success) {
        console.log("Login successful!");
        console.log("Token received");
        
        // Store token in localStorage
        localStorage.setItem("adminToken", result.data.token);
        localStorage.setItem("adminData", JSON.stringify(result.data.admin));
        
        setSuccess("Login successful! Redirecting...");
        
        // Call the onLogin callback with the admin data
        if (onLogin) {
          onLogin(result.data);
        }
      } else {
        console.error("Login failed:", result.message);
        setError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      setError(`Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Login
        </h2>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg border border-green-200">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-800 mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username", { required: "Username is required" })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            } bg-gray-50 text-gray-800`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            } bg-gray-50 text-gray-800`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;