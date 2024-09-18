import React, { useEffect, useState } from 'react';
import { getSchoolName, getLogo, getAddress, getPhone1, getPhone2, getEmail1, getEmail2, getWebsite, fetchSchoolData } from '../Schoolinfo.js'; // Adjust the path to the actual file

const SchoolAbout = () => {
  const [isSchoolDataLoaded, setIsSchoolDataLoaded] = useState(false);

  // Fetch school data when the component mounts
  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        await fetchSchoolData(); // Ensure fetchSchoolData is available
        setIsSchoolDataLoaded(true); // Set flag to true once data is loaded
      } catch (error) {
        console.error('Error loading school data:', error);
      }
    };

    loadSchoolData();
  }, []);

  return (
    <div className="min-h-screen p-2 md:p-4">
      {/* Container for the school information */}
      <div className="bg-white rounded-lg shadow-lg max-w-md md:max-w-4xl mx-auto p-4 md:p-6">
        {/* School Logo and Name */}
        <div className="flex flex-col md:flex-row items-center mb-2 md:mb-6">
          {isSchoolDataLoaded && (
            <>
              <img
                src={getLogo()}
                alt="School Logo"
                className="h-20 w-20 md:h-24 md:w-24 rounded-full mb-4 md:mb-0 border-4 border-blue-500"
              />
              <div className="text-center md:text-left md:ml-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{getSchoolName()}</h1>
                <p className="text-sm md:text-lg text-gray-600 mt-2">{getAddress()}</p>
              </div>
            </>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
          {isSchoolDataLoaded && (
            <>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-700">Contact Information</h2>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Phone 1: <a href={`tel:${getPhone1()}`} className="text-blue-500 hover:underline">{getPhone1()}</a>
                </p>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Phone 2: <a href={`tel:${getPhone2()}`} className="text-blue-500 hover:underline">{getPhone2()}</a>
                </p>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Email 1: <a href={`mailto:${getEmail1()}`} className="text-blue-500 hover:underline">{getEmail1()}</a>
                </p>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Email 2: <a href={`mailto:${getEmail2()}`} className="text-blue-500 hover:underline">{getEmail2()}</a>
                </p>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Website: <a href={getWebsite()} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{getWebsite()}</a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolAbout;
