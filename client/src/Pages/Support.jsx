import React, { useState, useEffect } from 'react';

const Support = () => {
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
    <div className="min-h-screen p-4">
  <div className="mx-auto">
    {isMobile ? (
      // Mobile layout (app-like)
      <div className="max-h-screen">
        <div className="max-w-5xl mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-extrabold text-blue-900 text-center">Support</h1>
          </header>
          <div className="grid grid-cols-1 gap-6">
            {/* School Helpline */}
            <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <i className="fas fa-phone-alt text-teal-500 text-4xl mr-4"></i>
                <h2 className="text-xl font-bold text-blue-900">School Helpline</h2>
              </div>
              <p className="text-gray-600 text-sm">Contact numbers for school support.</p>
              <ul className="list-disc ml-8 text-sm">
                <li>Principal: +91 XXXXXXXXXX</li>
                <li>Admin Office: +91 XXXXXXXXXX</li>
              </ul>
            </div>

            {/* Class Teacher Contact */}
            <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <i className="fas fa-user-tie text-orange-500 text-4xl mr-4"></i>
                <h2 className="text-xl font-bold text-blue-900">Class Teacher Contact</h2>
              </div>
              <p className="text-gray-600 text-sm">Contact details of class teachers.</p>
              <ul className="list-disc ml-8 text-sm">
                <li>Class 10A - Mr. ABC: +91 XXXXXXXXXX</li>
                <li>Class 12B - Ms. XYZ: +91 XXXXXXXXXX</li>
              </ul>
            </div>

            {/* Important Numbers for Children */}
            <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <i className="fas fa-exclamation-circle text-red-500 text-4xl mr-4"></i>
                <h2 className="text-xl font-bold text-blue-900">Important Numbers (India)</h2>
              </div>
              <p className="text-gray-600 text-sm">Important numbers for children in India.</p>
              <ul className="list-disc ml-8 text-sm">
                <li>Child Helpline: 1098</li>
                <li>Police: 100</li>
                <li>Fire: 101</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        ) : (
          // Desktop layout
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
                  <ul className="list-disc ml-8">
                    <li>Principal: +91 XXXXXXXXXX</li>
                    <li>Admin Office: +91 XXXXXXXXXX</li>
                  </ul>
                </div>

                {/* Class Teacher Contact */}
                <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-user-tie text-blue-800 text-3xl mr-3"></i>
                    <h2 className="text-2xl font-semibold text-black">Class Teacher Contact</h2>
                  </div>
                  <p className="text-gray-700">Contact details of class teachers.</p>
                  <ul className="list-disc ml-8">
                    <li>Class 10A - Mr. ABC: +91 XXXXXXXXXX</li>
                    <li>Class 12B - Ms. XYZ: +91 XXXXXXXXXX</li>
                  </ul>
                </div>

                {/* Important Numbers for Children */}
                <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-exclamation-circle text-blue-800 text-3xl mr-3"></i>
                    <h2 className="text-2xl font-semibold text-black">Important Numbers (India)</h2>
                  </div>
                  <p className="text-gray-700">Important numbers for children in India.</p>
                  <ul className="list-disc ml-8">
                    <li>Child Helpline: 1098</li>
                    <li>Police: 100</li>
                    <li>Fire: 101</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
