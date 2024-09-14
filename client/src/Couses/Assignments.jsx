import React, { useState, useEffect } from 'react';
import axios from 'axios';
import studentId from '../config'; // Assuming the studentId is correctly imported

const CourseMaterialStudentPage = () => {
  const [assignments, setAssignments] = useState([]);
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
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/assignments/getAssignmentsByClassNameAndSectionName/${student.class}/${student.section}`
        );
        setAssignments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [student]);

  return (
    <div className="container mx-auto p-2 sm:p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center justify-center">
        <i className="lg:hidden fas fa-book-open text-yellow-400 mr-2"></i>
        Assignments for {student?.class} ({student?.section})
      </h1>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <i className="fas fa-spinner fa-spin text-lg sm:text-xl text-gray-600"></i>
        </div>
      ) : assignments.length === 0 ? (
        <div className="text-center text-base sm:text-lg text-gray-600">
          <i className="fas fa-folder-open text-gray-500 mr-2"></i>
          No assignments available for this class and section.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-3 sm:p-4">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">
                  <i className="lg:hidden fas fa-file-alt text-red-500 mr-2"></i>
                  {assignment.assignmentTitle}
                </h2>
                <p className="text-sm sm:text-base text-gray-700 mb-1">
                  <strong>Subject:</strong> {assignment.subjectName}
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-1">
                  <strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-1">
                  <strong>Marks:</strong> {assignment.marks}
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  <strong>Description:</strong> {assignment.description}
                </p>
                {assignment.assignmentFile && (
                  <div className="flex space-x-4">
                  <a href={assignment.assignmentFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center text-sm sm:text-base">
                    <i className="fas fa-eye mr-2"></i>View
                  </a>
                  <a href={`http://localhost:5000/api/assignments/download/${assignment._id}`} download className="text-green-600 hover:underline flex items-center text-sm sm:text-base">
                    <i className="fas fa-download mr-2"></i>Download
                  </a>
                </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseMaterialStudentPage;
