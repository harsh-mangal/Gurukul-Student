import React from 'react';

const FeeManagement = () => {
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-black">Fee Management</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Fee Structure */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-rupee-sign text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Fee Structure</h2>
            </div>
            <p className="text-gray-700">View detailed fee structure for your courses.</p>
            {/* Add content related to fee structure here */}
          </div>

          {/* Payment Status */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-money-bill-wave text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Payment Status</h2>
            </div>
            <p className="text-gray-700">Check the status of your fee payments.</p>
            {/* Add content related to payment status here */}
          </div>

          {/* Left Fees */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-coins text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Left Fees</h2>
            </div>
            <p className="text-gray-700">View the remaining fees to be paid.</p>
            {/* Add content related to left fees here */}
          </div>

          {/* Online Fee Payment */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-credit-card text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Online Fee Payment</h2>
            </div>
            <p className="text-gray-700">Pay your fees securely online.</p>
            {/* Add content related to online fee payment here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;
