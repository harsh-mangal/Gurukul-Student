import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-blue-800 p-4 flex justify-between items-center shadow-md">
      <div className="text-white">
        <h1 className="text-xl font-bold">Gurukul</h1>
        <p>Digitize your School</p>
      </div>
      <div className="flex items-center">
        <Link to="/notifications-announcements" className="text-white mr-6">
          <i className="fas fa-bell text-2xl hover:text-gray-200"></i>
        </Link>
        <span className="text-white mr-4">User Name</span>
        <button className="bg-white text-light-blue-500 px-4 py-2 rounded hover:bg-gray-200 font-semibold">
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
        <button onClick={toggleSidebar} className="text-white ml-4 md:hidden">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
