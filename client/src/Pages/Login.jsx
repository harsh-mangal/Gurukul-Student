import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Adjust import based on your setup
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deactivationMessage, setDeactivationMessage] = useState('');
  
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');
    setDeactivationMessage('');

    try {
      const response = await axios.post('https://project-5zck.onrender.com/api/users/login', {
        username,
        password
      });

      if (response.data.token) {
        // Decode the token to get student ID
        const decodedToken = jwtDecode(response.data.token);
        const studentId = decodedToken.userId; // Adjust according to your token payload structure

        // Fetch student status
        const statusResponse = await axios.get(`https://project-5zck.onrender.com/api/students/getStudents/${studentId}`);
        
        if (statusResponse.data.status === 'inactive') {
          setDeactivationMessage('Student is deactivated.');
          // Clear the token from localStorage
          localStorage.removeItem('authToken');
        } else {
          // Store the token (e.g., in localStorage)
          localStorage.setItem('authToken', response.data.token);
          navigate('/student/dashboard'); // Redirect using navigate
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err); // Log the error for debugging
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        {/* School Logo, Name, and Address */}
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/100" // Replace with actual logo URL
            alt="School Logo"
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">School Name</h1>
          <p className="text-sm text-gray-600">1234 School Address, City, Country</p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* Deactivation Message */}
        {deactivationMessage && <p className="text-red-500 text-center mb-4">{deactivationMessage}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="username">Username</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="password">Password</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:bg-gradient-to-l focus:ring-2 focus:ring-blue-500 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
