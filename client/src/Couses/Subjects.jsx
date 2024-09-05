import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Subjects() {
  const { classId } = useParams(); // Get classId from URL params
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/classes/getClassById/C7`);
        setData([response.data]); // Wrap data in an array to match previous structure
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data whenever classId changes

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-gray-300 pb-2">Subject Overview</h1>
      {data.map((classData, index) => (
        <div key={index} className="bg-white w-1/4 shadow-md rounded-lg p-6 mb-6 border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Class: {classData.className}</h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Subjects</h3>
            <ul className="list-disc pl-5 space-y-2">
              {classData.subjects.map((subject, idx) => (
                <li key={idx} className="text-gray-600">{subject.subjectName}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Subjects
