import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`bg-blue-800 text-white w-48 min-h-full	 p-4 shadow-lg fixed top-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
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
};

export default Sidebar;
