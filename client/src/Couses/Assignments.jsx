import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseMaterialStudentPage = () => {
  const { className, sectionName } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/assignments/getAssignmentsByClassNameAndSectionName/5th/Rose`);
        setAssignments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        alert('Error fetching assignments');
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">Assignments for {className} - {sectionName}</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      ) : assignments.length === 0 ? (
        <div className="text-center text-xl text-gray-600">No assignments available for this class and section.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{assignment.assignmentTitle}</h2>
                <p className="text-gray-700 mb-1"><strong>Subject:</strong> {assignment.subjectName}</p>
                <p className="text-gray-700 mb-1"><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                <p className="text-gray-700 mb-1"><strong>Marks:</strong> {assignment.marks}</p>
                <p className="text-gray-700 mb-3"><strong>Description:</strong> {assignment.description}</p>
                {assignment.assignmentFile && (
                  <a href={assignment.assignmentFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Assignment File
                  </a>
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
