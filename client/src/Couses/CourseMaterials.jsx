import React, { useState, useEffect } from 'react';
import axios from 'axios';
import studentId from '../config';

const CourseMaterial = () => {
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if (student) {
      const fetchCourseMaterials = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/coursematerial/getCourseMaterialByClassAndSection/${student.class}/${student.section}`
          );
          setCourseMaterials(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching course materials:', error);
          setLoading(false);
        }
      };

      fetchCourseMaterials();
    }
  }, [student]);

  return (
    <div className="container mx-auto lg:p-3 sm:p-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-4 sm:mb-6 mt-2 lg:mt-4 ">
      <i class="lg:hidden fas fa-folder-open mr-2 text-sky-400"></i>{student ? `Course Materials for ${student.class}` : 'Loading student details...'}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <i className="fas fa-spinner fa-spin text-lg sm:text-xl text-gray-600"></i>
        </div>
      ) : courseMaterials.length === 0 ? (
        <div className="text-center text-base sm:text-lg text-gray-500">
          <i className="fas fa-folder-open text-gray-500 mr-2"></i>No course materials available
        </div>
      ) : (
        <>
          {/* Table view for laptops and large screens */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-full text-center bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="py-2 px-3 sm:px-4 text-gray-700">#</th>
                    <th className="py-2 px-3 sm:px-4 text-gray-700">Subject</th>
                    <th className="py-2 px-3 sm:px-4 text-gray-700">Title</th>
                    <th className="py-2 px-3 sm:px-4 text-gray-700">Description</th>
                    <th className="py-2 px-3 sm:px-4 text-gray-700">File</th>
                  </tr>
                </thead>
                <tbody>
                  {courseMaterials.map((material, index) => (
                    <tr key={material._id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                      <td className="py-2 px-3 sm:px-4 border-b border-gray-300">{index + 1}</td>
                      <td className="py-2 px-3 sm:px-4 border-b border-gray-300">{material.subjectName}</td>
                      <td className="py-2 px-3 sm:px-4 border-b border-gray-300">{material.title}</td>
                      <td className="py-2 px-3 sm:px-4 border-b border-gray-300">{material.description || 'No description'}</td>
                      <td className="py-2 px-3 sm:px-4 border-b border-gray-300">
                        <a href={material.courseMaterialFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mr-2">
                          <i className="fas fa-eye"></i> View
                        </a>
                        <a href={`http://localhost:5000/api/coursematerial/download/${material._id}`} download className="text-green-600 hover:underline">
                          <i className="fas fa-download"></i> Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card view for mobile screens */}
          <div className="lg:hidden grid grid-cols-1 gap-3 sm:gap-4">
            {courseMaterials.map((material, index) => (
              <div key={material._id} className="bg-white shadow-md rounded-lg p-2 sm:p-4">
                <div className="flex items-center text-gray-700 text-sm sm:text-lg font-semibold mb-2">
                  <i className="fas fa-book mr-2 text-yellow-800"></i>{material.subjectName}
                </div>
                <div className="text-gray-700 text-sm sm:text-lg mb-2">
                  <i className="fas fa-heading mr-2 text-green-400"></i>{material.title}
                </div>
                <div className="text-gray-600 text-sm sm:text-base mb-4">
                  <i className="fas fa-align-left mr-2 text-yellow-400"></i>{material.description || 'No description'}
                </div>
                <div className="flex space-x-4">
                  <a href={material.courseMaterialFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center text-sm sm:text-base">
                    <i className="fas fa-eye mr-2"></i>View
                  </a>
                  <a href={`http://localhost:5000/api/coursematerial/download/${material._id}`} download className="text-green-600 hover:underline flex items-center text-sm sm:text-base">
                    <i className="fas fa-download mr-2"></i>Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseMaterial;
