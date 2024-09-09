import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-black">Student Dashboard</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Academic Performance */}
          <Link to="/academic-performance">
            <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-4">
                <i className="fas fa-book text-blue-800 text-3xl mr-3"></i>
                <h2 className="text-2xl font-semibold text-black">Academic Performance</h2>
              </div>
              <p className="text-gray-700">View and analyze your grades and academic progress.</p>
            </div>
          </Link>

          {/* Notifications and Announcements */}
          <Link to="/notifications-announcements">
            <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-4">
                <i className="fas fa-bell text-blue-800 text-3xl mr-3"></i>
                <h2 className="text-2xl font-semibold text-black">Notifications & Announcements</h2>
              </div>
              <p className="text-gray-700">Stay updated with the latest notifications and announcements.</p>
            </div>
          </Link>

          {/* Events */}
          <Link to="/event-activities">
            <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-4">
                <i className="fas fa-calendar-alt text-blue-800 text-3xl mr-3"></i>
                <h2 className="text-2xl font-semibold text-black">Events</h2>
              </div>
              <p className="text-gray-700">Check out the upcoming events and activities.</p>
            </div>
          </Link>

          {/* Homework */}
          <Link to="/student-homework">
            <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-4">
                <i className="fas fa-pencil text-blue-800 text-3xl mr-3"></i>
                <h2 className="text-2xl font-semibold text-black">Homework</h2>
              </div>
              <p className="text-gray-700">Check your today's homework.</p>
            </div>
          </Link>

          {/* Test Schedule */}
          <Link to="/test-schedule">
            <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
              <div className="flex items-center mb-4">
                <i className="fas fa-clock text-blue-800 text-3xl mr-3"></i>
                <h2 className="text-2xl font-semibold text-black">Test Schedule</h2>
              </div>
              <p className="text-gray-700">View and prepare for your test.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
