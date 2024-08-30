import React from 'react';

const Courses = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-black">Courses</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Course Materials */}
          <Link to="/school-timing"></Link>
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-book-open text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Course Materials</h2>
            </div>
            <p className="text-gray-700">Access your course materials and resources.</p>
            {/* Add content related to course materials here */}
          </div>

          {/* Subjects */}
          <Link to="/school-timing"></Link>
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-book text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Subjects</h2>
            </div>
            <p className="text-gray-700">Explore the subjects you are enrolled in.</p>
            {/* Add content related to subjects here */}
          </div>

          {/* Assignments */}
          <Link to="/school-timing"></Link>
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-tasks text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Assignments</h2>
            </div>
            <p className="text-gray-700">View and submit your assignments.</p>
            {/* Add content related to assignments here */}
          </div>

          {/* Grades */}
          <Link to="/school-timing"></Link>
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-chart-line text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Grades</h2>
            </div>
            <p className="text-gray-700">Check your grades and performance.</p>
            {/* Add content related to grades here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
