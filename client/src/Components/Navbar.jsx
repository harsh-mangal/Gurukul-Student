import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  fetchSchoolData, 
  getSchoolName, 
  getLogo, 
  getAddress 
} from '../Schoolinfo.js'; // Adjust the path to the actual file

const Navbar = ({ toggleSidebar }) => {
  const history = useNavigate();
  const [isSchoolDataLoaded, setIsSchoolDataLoaded] = useState(false);

  // Fetch school data when the component mounts
  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        await fetchSchoolData(); // Fetch the data from the API
        setIsSchoolDataLoaded(true); // Set flag to true once data is loaded
      } catch (error) {
        console.error('Error loading school data:', error);
      }
    };

    loadSchoolData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-blue-800 p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center text-white">
        {/* Only render the school name and logo once the data is loaded */}
        {isSchoolDataLoaded && (
          <>
            <img
              src={getLogo()} 
              alt="School Logo" 
              className="h-12 w-12 rounded-full mr-4" // Larger, rounded logo
            />
            <h1 className="text-2xl font-bold">{getSchoolName()}</h1> {/* Display school name */}
          </>
        )}
      </div>
      <div className="flex items-center">
        {/* Notifications icon (visible on medium screens and up) */}
        <Link to="/notifications-announcements" className="text-white mr-6 md:block">
          <i className="fas fa-bell hover:text-gray-200"></i>
        </Link>

        {/* Logout button (visible on medium screens and up) */}
        <button
          className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 font-semibold hidden md:block"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>

        {/* Hamburger menu for smaller screens */}
        <button onClick={toggleSidebar} className="text-white ml-4 block md:hidden">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
