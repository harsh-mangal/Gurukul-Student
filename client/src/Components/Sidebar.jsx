import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Desktop Sidebar Component
const DesktopSidebar = () => (
   <aside className={`bg-blue-800 text-white w-48 min-h-full	 p-4 shadow-lg fixed top-0 left-0 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
      <div className="flex flex-col h-full">
        <ul className="space-y-6 flex-grow">
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-3 rounded bg-white text-black font-semibold shadow-lg">
            <i className="fas fa-tachometer-alt"></i>
            <Link to='/student/dashboard'>Dashboard</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-3 rounded bg-white text-black font-semibold shadow-lg">
            <i className="fas fa-user"></i>
            <Link to='/student/profile'>Profile</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-3 rounded bg-white text-black font-semibold shadow-lg">
            <i className="fas fa-chalkboard-teacher"></i>
            <Link to='/student/courses'>Courses</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-3 rounded bg-white text-black font-semibold shadow-lg">
            <i className="fas fa-cogs"></i>
            <Link to='/student/examresults'>Exam Results</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-3 rounded bg-white text-black font-semibold shadow-lg">
            <i className="fas fa-cogs"></i>
            <Link to='/student/feemanagement'>Fee Records</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-200 p-3 rounded bg-white text-black font-semibold shadow-lg">
            <i className="fas fa-question-circle"></i>
            <Link to='/student/support'>Support</Link>
          </li>
        </ul>
      </div>
    </aside>
);

// Mobile Sidebar Component
const MobileSidebar = ({ isOpen }) => (
  <aside className={`fixed top-0 left-0 min-h-full p-4 bg-blue-600 text-white w-64 border-r border-blue-700 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-md`}>
    <div className="flex flex-col h-full">
      {/* Software Name */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Gurukul ERP</h1>
      </div>

      {/* Links */}
      <ul className="space-y-6 flex-grow">
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <i className="fas fa-tachometer-alt text-gray-300"></i>
          <Link to='/dashboard' className="text-lg font-medium text-white">Dashboard</Link>
        </li>
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <i className="fas fa-user text-gray-300"></i>
          <Link to='/profile' className="text-lg font-medium text-white">Profile</Link>
        </li>
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <i className="fas fa-chalkboard-teacher text-gray-300"></i>
          <Link to='/courses' className="text-lg font-medium text-white">Courses</Link>
        </li>
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <i className="fas fa-file-alt text-gray-300"></i>
          <Link to='/examresults' className="text-lg font-medium text-white">Exam Results</Link>
        </li>
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <i className="fas fa-wallet text-gray-300"></i>
          <Link to='/feemanagement' className="text-lg font-medium text-white">Fee Records</Link>
        </li>
        <li className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <i className="fas fa-question-circle text-gray-300"></i>
          <Link to='/support' className="text-lg font-medium text-white">Support</Link>
        </li>
      </ul>

      {/* Logout Button */}
      <ul>
        <li className="flex items-center space-x-4 p-3 rounded-lg border border-blue-600 bg-blue-900 hover:bg-blue-700 transition-colors duration-200">
          <i className="fas fa-sign-out-alt text-gray-300"></i>
          <button className="text-lg font-medium text-white">Logout</button>
        </li>
      </ul>
    </div>
</aside>

);

const Sidebar = ({ isOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileSidebar isOpen={isOpen} /> : <DesktopSidebar />;
};

export default Sidebar;
