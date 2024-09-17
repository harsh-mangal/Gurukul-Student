import React, { useState, useEffect } from 'react';
import studentId from '../config'; // Assuming the studentId is correctly imported
import axios from 'axios';

// Utility function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Utility function to sort subjects by exam date
const sortByExamDate = (subjects) => {
  return subjects.slice().sort((a, b) => new Date(a.examDate) - new Date(b.examDate));
};

const ExamDatesheet = () => {
  const [examDatesheets, setExamDatesheets] = useState([]);
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
    const fetchExamDatesheets = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/exams/getExamByClass/${student.class}`);
        setExamDatesheets(response.data);
      } catch (err) {
        console.error('Error fetching exam datesheets:', err);
        setError('Failed to fetch datesheets. Please try again later.');
      }
    };

    fetchExamDatesheets();
  }, [student]);

  if (examDatesheets.length === 0) return <div className="text-center p-4">Loading...</div>; // Display loading while data is being fetched

  return (
    <div className="max-w-full mx-auto p-2 lg:p-4 bg-white shadow-2xl rounded-lg lg:mt-3">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2 sm:mb-4 lg:mb-6">
        <i className="lg:hidden sm:hidden mr-2 fas fa-calendar-alt text-red-500 sm:text-blue-800"></i> Datesheets for {student.class} class
      </h2>

      {examDatesheets.map((examDatesheet, index) => {
        // Check if subjects exist and are an array
        const subjects = Array.isArray(examDatesheet.subjects) ? examDatesheet.subjects : [];

        // Sort subjects by exam date
        const sortedSubjects = sortByExamDate(subjects);

        return (
          <div key={index} className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              <i className="lg:hidden sm:hidden mr-2 fas fa-file-alt text-green-600 sm:text-green-800"></i> Exam: {examDatesheet.examName}
            </h3>

            {/* Add responsive scrolling for the table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-center">#</th>
                    <th className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-center">
                      Subject
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-center">
                      Date
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-center">
                      Timing
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-center">
                      Room
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-center">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y divide-gray-200">
                  {sortedSubjects.map((subject, idx) => (
                    <tr key={idx} className="text-center text-xs sm:text-sm">
                      <td className="border px-2 py-2">{idx + 1}</td>
                      <td className="border px-2 py-2">{subject.subjectName}</td>
                      <td className="border px-2 py-2">{formatDate(subject.examDate)}</td>
                      <td className="border px-2 py-2">{subject.startTime} - {subject.endTime}</td>
                      <td className="border px-2 py-2">{subject.room}</td>
                      <td className="border px-2 py-2">{subject.notes || '--'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExamDatesheet;
