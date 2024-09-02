import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-black">Profile</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* View Profile */}
          <Link to="/view-profile">
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-user-circle text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">View Profile</h2>
            </div>
            <p className="text-gray-700">View your personal information and details.</p>
            {/* Add content related to view profile here */}
          </div>
          </Link>

          {/* Attendance */}
          <Link to="/student-attendance">
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-clipboard-check text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Attendance</h2>
            </div>
            <p className="text-gray-700">View your attendance records.</p>
            {/* Add content related to attendance here */}
          </div>
          </Link>

          {/* Change Password */}
          <Link to="/change-password">
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-key text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Change Password</h2>
            </div>
            <p className="text-gray-700">Change your account password securely.</p>
            {/* Add content related to change password here */}
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
