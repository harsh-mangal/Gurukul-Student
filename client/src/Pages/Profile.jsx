import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="max-h-screen p-4">
      <div className="mx-auto">
        {isMobile ? (
          // Smaller screens layout (app-like)
          <div className="max-h-screen ">
            <div className="max-w-5xl mx-auto">
              <header className="mb-6">
                <h1 className="text-3xl font-extrabold text-blue-900 text-center">Profile</h1>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* View Profile */}
                <Link to="/view-profile" className="block">
                  <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center">
                    <i className="fas fa-user-circle text-blue-600 text-4xl mr-4"></i>
                    <div>
                      <h2 className="text-xl font-bold text-blue-900">View Profile</h2>
                      <p className="text-gray-600 text-sm">View your personal information.</p>
                    </div>
                  </div>
                </Link>

                {/* Attendance */}
                <Link to="/student-attendance" className="block">
                  <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center">
                    <i className="fas fa-clipboard-check text-green-600 text-4xl mr-4"></i>
                    <div>
                      <h2 className="text-xl font-bold text-green-900">Attendance</h2>
                      <p className="text-gray-600 text-sm">Check your attendance records.</p>
                    </div>
                  </div>
                </Link>

                {/* Timetable */}
                <Link to="/school-timetable" className="block">
                  <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center">
                    <i className="fas fa-table text-purple-600 text-4xl mr-4"></i>
                    <div>
                      <h2 className="text-xl font-bold text-purple-900">My Timetable</h2>
                      <p className="text-gray-600 text-sm">View your class schedule.</p>
                    </div>
                  </div>
                </Link>

                {/* Student Achievement */}
                <Link to="/student-achievement" className="block">
                  <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center">
                    <i className="fas fa-trophy text-yellow-500 text-4xl mr-4"></i>
                    <div>
                      <h2 className="text-xl font-bold text-yellow-800">Student Achievement</h2>
                      <p className="text-gray-600 text-sm">View your personal achievements.</p>
                    </div>
                  </div>
                </Link>

                {/* School Achievement */}
                <Link to="/school-achievement" className="block">
                  <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center">
                    <i className="fas fa-medal text-red-500 text-4xl mr-4"></i>
                    <div>
                      <h2 className="text-xl font-bold text-red-800">School Achievement</h2>
                      <p className="text-gray-600 text-sm">View school-wide achievements.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen p-6">
            <div className="max-w-full mx-auto">
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
                  </div>
                </Link>

                {/* Timetable */}
                <Link to="/school-timetable">
                  <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
                    <div className="flex items-center mb-4">
                      <i className="fas fa-table text-blue-800 text-3xl mr-3"></i>
                      <h2 className="text-2xl font-semibold text-black">My Timetable</h2>
                    </div>
                    <p className="text-gray-700">View your class timetable for the week.</p>
                  </div>
                </Link>

                {/* Student Achievement */}
                <Link to="/student-achievement">
                  <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
                    <div className="flex items-center mb-4">
                      <i className="fas fa-trophy text-blue-800 text-3xl mr-3"></i>
                      <h2 className="text-2xl font-semibold text-black">Student Achievement</h2>
                    </div>
                    <p className="text-gray-700">View your personal achievements.</p>
                  </div>
                </Link>

                {/* School Achievement */}
                <Link to="/school-achievement">
                  <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
                    <div className="flex items-center mb-4">
                      <i className="fas fa-medal text-blue-800 text-3xl mr-3"></i>
                      <h2 className="text-2xl font-semibold text-black">School Achievement</h2>
                    </div>
                    <p className="text-gray-700">View school-wide achievements.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
