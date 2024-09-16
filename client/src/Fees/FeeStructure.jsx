import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeeStructure = () => {
  const [feeData, setFeeData] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  // Fetch data from the API
  useEffect(() => {
    const fetchFeeStructure = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feeStructures/getFeeStructureById/66d18ce5e677000e4ab74c82'); // Replace with your API endpoint
        console.log('API response:', response.data); // Log the response to check its structure
        // Check if response is an array or object
        if (Array.isArray(response.data)) {
          setFeeData(response.data); // If it's an array, set it directly
        } else {
          setFeeData([response.data]); // If it's an object, wrap it in an array
        }
        setLoading(false); // Turn off loading state once data is fetched
      } catch (error) {
        setError('Error fetching fee structure');
        setLoading(false); // Turn off loading state on error
      }
    };

    fetchFeeStructure();
  }, []); // Empty dependency array to run only on mount

  // Loading and error handling
  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Fee Structure</h1>

      {/* For larger screens: Laptop/Desktop */}
      <div className="hidden lg:block">
  <div className="overflow-x-auto">
    <table className="table-auto w-full border-collapse border border-gray-200 shadow-md rounded-lg">
      <thead>
        <tr>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-gray-700">Class</th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-gray-700">Student Type</th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-gray-700">Total Fees</th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-gray-700">Medium</th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-gray-700">Fee Heads</th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-gray-700">Monthly Fees</th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-gray-700">Remarks</th>
        </tr>
      </thead>
      <tbody>
        {feeData.map((data, index) => (
          <tr
            key={index}
            className="bg-white transition-colors duration-200 hover:bg-gray-50"
          >
            <td className="border border-gray-200 px-4 py-2">{data.class}</td>
            <td className="border border-gray-200 px-4 py-2">{data.studentType}</td>
            <td className="border border-gray-200 px-4 py-2">₹{data.totalFees}</td>
            <td className="border border-gray-200 px-4 py-2">{data.medium}</td>
            <td className="border border-gray-200 px-4 py-2">
              {Object.keys(data.feeHeadValues).map((key) => (
                <div key={key} className="flex justify-between">
                  <span>{key}</span>
                  <span>₹{data.feeHeadValues[key]}</span>
                </div>
              ))}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {[...Array(12).keys()].map((i) => (
                <div key={i} className="flex justify-between">
                  <span>Month {i + 1}</span>
                  <span>₹{data[`month${i + 1}`]}</span>
                </div>
              ))}
            </td>
            <td className="border border-gray-200 px-4 py-2">{data.remarks || "No Remarks"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



      {/* For smaller screens: Mobile/Tablet */}
      <div className="lg:hidden">
  {feeData.map((data, index) => (
    <div
      key={index}
      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 transform hover:scale-105"
    >
      <h2 className="text-2xl font-bold mb-2">Class: {data.class}</h2>
      <p className="text-lg mb-1">Student Type: <span className="font-medium">{data.studentType}</span></p>
      <p className="text-lg mb-1">Total Fees: <span className="font-semibold">₹{data.totalFees}</span></p>
      <p className="text-lg mb-4">Medium: <span className="font-medium">{data.medium}</span></p>
      
      <div className="bg-white text-gray-800 p-4 rounded-lg shadow-inner mb-4">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">Fee Head Details</h3>
        {Object.keys(data.feeHeadValues).map((key) => (
          <p key={key} className="flex justify-between py-1 border-b border-gray-300">
            <span>{key}</span> 
            <span>₹{data.feeHeadValues[key]}</span>
          </p>
        ))}
      </div>
      
      <div className="bg-white text-gray-800 p-4 rounded-lg shadow-inner">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">Monthly Fees</h3>
        {[...Array(12).keys()].map((i) => (
          <p key={i} className="flex justify-between py-1 border-b border-gray-300">
            <span>Month {i + 1}</span>
            <span>₹{data[`month${i + 1}`]}</span>
          </p>
        ))}
      </div>
      
      {data.remarks && (
        <p className="mt-4 text-lg text-gray-100">
          <strong>Remarks:</strong> {data.remarks}
        </p>
      )}
    </div>
  ))}
</div>

    </div>
  );
};

export default FeeStructure;
