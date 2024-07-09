import React from 'react';

const Support = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-black">Support</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* School Helpline */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-phone-alt text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">School Helpline</h2>
            </div>
            <p className="text-gray-700">Contact numbers for school support.</p>
            {/* Add school helpline numbers here */}
            <ul className="list-disc ml-8">
              <li>Principal: +91 XXXXXXXXXX</li>
              <li>Admin Office: +91 XXXXXXXXXX</li>
              {/* Add more numbers as needed */}
            </ul>
          </div>

          {/* Class Teacher Contact */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-user-tie text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Class Teacher Contact</h2>
            </div>
            <p className="text-gray-700">Contact details of class teachers.</p>
            {/* Add class teacher contact information here */}
            <ul className="list-disc ml-8">
              <li>Class 10A - Mr. ABC: +91 XXXXXXXXXX</li>
              <li>Class 12B - Ms. XYZ: +91 XXXXXXXXXX</li>
              {/* Add more contact information as needed */}
            </ul>
          </div>

          {/* Important Numbers for Children */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-exclamation-circle text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Important Numbers (India)</h2>
            </div>
            <p className="text-gray-700">Important numbers for children in India.</p>
            {/* Add important numbers for children in India here */}
            <ul className="list-disc ml-8">
              <li>Child Helpline: 1098</li>
              <li>Police: 100</li>
              <li>Fire: 101</li>
              {/* Add more important numbers */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
