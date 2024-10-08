import React, { useState, useEffect } from 'react';
import studentId from '../config';
import axios from 'axios';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa'; // Using react-icons for loading and error icons

function Subjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);

  // Fetch the student details
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/getStudents/${studentId}`);
        setStudent(response.data);
      } catch (err) {
        console.error('Error fetching student:', err);
      }
    };

    fetchStudent();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/classes/getClassByName/${student.class}`);
        setData([response.data]); // Wrap data in an array to match previous structure
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [student]); // Fetch data whenever classId changes

  if (loading) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-3xl text-gray-600" /></div>;

  return (
    <div className="container mx-auto p-1 lg:p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-2 text-gray-900 border-b-2 border-blue-500 pb-2"><i class="lg:hidden sm:hidden fas fa-book-open mr-2 text-teal-500"></i>Subject Overview</h1>
      {data.map((classData, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-4 md:p-6 mb-2 border border-gray-200">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">Class: {classData.className}</h2>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">Subjects</h3>
            <ul className="list-disc pl-5 space-y-2">
              {classData.subjects.map((subject, idx) => (
                <li key={idx} className="text-gray-600 flex items-center">
                  <i className="lg:hidden sm:hidden fas fa-book mr-2 text-blue-500"></i>
                  {subject.subjectName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Subjects;
