import React, { useState, useEffect } from 'react';
import axios from 'axios';
import studentId from '../config';

const Studentinfo = () => {
  const [student, setStudent] = useState(null);

  // Fetch student data from the backend API
  useEffect(() => {
    axios.get(`https://project-5zck.onrender.com/api/students/getStudents/${studentId}`)
      .then(response => {
        setStudent(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  if (!student) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-full mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center p-3 bg-gradient-to-r from-blue-500 via-green-400 to-purple-500">
        <img
          className="w-16 h-16 rounded-full border-4 border-white shadow-md"
          src={student.image}
          alt="Profile"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-white">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-white text-sm mt-1">Roll Number: {student.rollNo}</p> {/* Added Roll Number */}
          <div className="flex mt-1">
            <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              Class: {student.class}
            </span>
            <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs font-medium ml-2">
              Section: {student.section}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentinfo;
