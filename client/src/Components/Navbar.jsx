import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const history = useNavigate();
  function handleLogout() {
    localStorage.removeItem('authToken');
    // If using React Router for navigation
   
    history('/login'); // Redirect to the login page or desired route
    // Optionally: Clear any other user-specific state or context
}

  return (
    <nav className="bg-blue-800 p-4 flex justify-between items-center shadow-md">
      <div className="text-white">
        <h1 className="text-xl font-bold">Gurukul</h1>
      </div>
      <div className="flex items-center">
        {/* Show this on medium screens and up */}
        <Link to="/notifications-announcements" className="text-white mr-6  md:block">
          <i className="fas fa-bell  hover:text-gray-200"></i>
        </Link>
        <button className="bg-white text-light-blue-500 px-4 py-2 rounded hover:bg-gray-200 font-semibold hidden md:block" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
        {/* Show this on smaller screens */}
        <button onClick={toggleSidebar} className="text-white ml-4 block md:hidden">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
