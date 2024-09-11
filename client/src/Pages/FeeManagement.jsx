import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FeeManagement = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
                <h1 className="text-3xl font-extrabold text-blue-900 text-center">
                  Fee Management
                </h1>
              </header>
              <div className="grid grid-cols-1 gap-6">
                {/* Fee Structure */}
                <Link to="/fee-structure" className="block">
                  <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center">
                    <i className="fas fa-rupee-sign text-yellow-500 text-4xl mr-4"></i>
                    <div>
                      <h2 className="text-xl font-bold text-blue-900">
                        Fee Structure
                      </h2>
                      <p className="text-gray-600 text-sm">
                        View detailed fee structure for your courses.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Student Ledger */}
                <Link to="/pending-fee" className="block">
                  <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center">
                    <i className="fas fa-coins text-green-500 text-4xl mr-4"></i>
                    <div>
                      <h2 className="text-xl font-bold text-blue-900">
                        Student Ledger
                      </h2>
                      <p className="text-gray-600 text-sm">
                        View the remaining fees to be paid.
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Online Fee Payment */}
                <Link to="/online-payment" className="block">
                  <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center">
                    <i className="fas fa-credit-card text-pink-500 text-4xl mr-4"></i>
                    <div>
                      <h2 className="text-xl font-bold text-blue-900">
                        Online Fee Payment
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Pay your fees securely online.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout
          <div className="min-h-screen p-6">
            <div className="max-w-full mx-auto">
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-black">
                  Fee Management
                </h1>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Fee Structure */}
                <Link to="/fee-structure">
                  <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
                    <div className="flex items-center mb-4">
                      <i className="fas fa-rupee-sign text-blue-800 text-3xl mr-3"></i>
                      <h2 className="text-2xl font-semibold text-black">
                        Fee Structure
                      </h2>
                    </div>
                    <p className="text-gray-700">
                      View detailed fee structure for your courses.
                    </p>
                  </div>
                </Link>

                {/* Student Ledger */}
                <Link to="/pending-fee">
                  <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
                    <div className="flex items-center mb-4">
                      <i className="fas fa-coins text-blue-800 text-3xl mr-3"></i>
                      <h2 className="text-2xl font-semibold text-black">
                        Student Ledger
                      </h2>
                    </div>
                    <p className="text-gray-700">
                      View the remaining fees to be paid.
                    </p>
                  </div>
                </Link>

                {/* Online Fee Payment */}
                <Link to="/online-payment">
                  <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
                    <div className="flex items-center mb-4">
                      <i className="fas fa-credit-card text-blue-800 text-3xl mr-3"></i>
                      <h2 className="text-2xl font-semibold text-black">
                        Online Fee Payment
                      </h2>
                    </div>
                    <p className="text-gray-700">
                      Pay your fees securely online.
                    </p>
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

export default FeeManagement;
