import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDollarSign, FaBook, FaUsers, FaCalendar } from 'react-icons/fa';

const FeeStructure = () => {
  const [feeData, setFeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeStructure = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feeStructures/getFeeStructureById/66d18ce5e677000e4ab74c82');
        if (Array.isArray(response.data)) {
          setFeeData(response.data);
        } else {
          setFeeData([response.data]);
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching fee structure');
        setLoading(false);
      }
    };

    fetchFeeStructure();
  }, []);

  if (loading) return <div className="text-center mt-8 text-sm">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500 text-sm">{error}</div>;

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl md:text-3xl font-bold text-center"><i class="md:hidden fas fa-layer-group mr-2 text-red-400"></i>Fee Structure</h1>

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
                      <div key={key} className="flex justify-between text-sm">
                        <span>{key}</span>
                        <span>₹{data.feeHeadValues[key]}</span>
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {[...Array(12).keys()].map((i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>Month {i + 1}</span>
                        <span>₹{data[`month${i + 1}`]}</span>
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{data.remarks || "No Remarks"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* For smaller screens: Mobile/Tablet */}
      <div className="lg:hidden max-h-screen">
        {feeData.map((data, index) => (
          <div
            key={index}
            className=" max-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg p-2 mb-4 transition-all duration-300 transform hover:scale-105"
          >
            <h2 className="text-xl font-bold mb-2 flex items-center text-sm">
              <FaBook className="mr-2" /> Class: {data.class}
            </h2>
            <p className="text-sm mb-1 flex items-center">
              <FaUsers className="mr-2" /> Student Type: <span className="font-medium">{data.studentType}</span>
            </p>
            <p className="text-sm mb-1 flex items-center">
              <FaDollarSign className="mr-2" /> Total Fees: <span className="font-semibold">₹{data.totalFees}</span>
            </p>
            <p className="text-sm mb-4 flex items-center">
              <FaBook className="mr-2" /> Medium: <span className="font-medium">{data.medium}</span>
            </p>
            
            <div className=" max-h-screen bg-white text-gray-800 p-2 rounded-lg shadow-inner mb-4 text-sm">
              <h3 className="text-sm font-semibold mb-1 text-indigo-600 flex items-center">
                <FaBook className="mr-2" /> Fee Head Details
              </h3>
              {Object.keys(data.feeHeadValues).map((key) => (
                <p key={key} className="flex justify-between py-1 border-b border-gray-300">
                  <span>{key}</span> 
                  <span>₹{data.feeHeadValues[key]}</span>
                </p>
              ))}
            </div>
            
            <div className="bg-white text-gray-800 p-2 rounded-lg shadow-inner text-sm">
              <h3 className="text-sm font-semibold mb-1 text-indigo-600 flex items-center">
                <FaCalendar className="mr-2" /> Monthly Fees
              </h3>
              {[...Array(12).keys()].map((i) => (
                <p key={i} className="flex justify-between py-1 border-b border-gray-300">
                  <span>Month {i + 1}</span>
                  <span>₹{data[`month${i + 1}`]}</span>
                </p>
              ))}
            </div>
            
            {data.remarks && (
              <p className="mt-2 text-sm text-gray-100">
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
