import React from 'react';
import { Link } from 'react-router-dom';

const Classes = () => {
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-black">Classes</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Timetable */}
          <Link to="/school-timetable">
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-table text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">My Timetable</h2>
            </div>
            <p className="text-gray-700">View your class timetable for the week.</p>
            {/* Add content related to the timetable here */}
          </div>
          </Link>

          {/* Calendar */}
          <Link to="/calendar">
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-calendar-alt text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Calendar</h2>
            </div>
            <p className="text-gray-700">Check out your academic calendar for important dates.</p>
            {/* Add content related to the calendar here */}
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Classes;
