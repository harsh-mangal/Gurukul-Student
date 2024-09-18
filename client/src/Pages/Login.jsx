import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  fetchSchoolData, 
  getSchoolName, 
  getLogo, 
  getAddress 
} from '../Schoolinfo.js'; // Adjust the path to the actual file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deactivationMessage, setDeactivationMessage] = useState('');
  const [isSchoolDataLoaded, setIsSchoolDataLoaded] = useState(false);

  const navigate = useNavigate(); // Use useNavigate for redirection

  // Fetch school data when component mounts
  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        await fetchSchoolData();
        setIsSchoolDataLoaded(true); // Set the state to indicate school data is loaded
      } catch (error) {
        console.error('Error loading school data:', error);
      }
    };

    loadSchoolData();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');
    setDeactivationMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password
      });

      if (response.data.token) {
        // Handle login logic
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        {/* Only render the school details once they are loaded */}
        {isSchoolDataLoaded && (
          <div className="text-center mb-6">
            <img
              src={getLogo()} // Get the logo URL from schoolService
              alt="School Logo"
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800">{getSchoolName()}</h1> {/* Get the school name */}
            <p className="text-sm text-gray-600">{getAddress()}</p> {/* Get the address */}
          </div>
        )}

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
