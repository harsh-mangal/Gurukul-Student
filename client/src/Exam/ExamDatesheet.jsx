import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const { className } = useParams(); // Get the class name from the URL
  const [examDatesheets, setExamDatesheets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamDatesheets = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/exams/getExamByClass/10th`);
        console.log('API Response:', response.data); // Log the API response
        setExamDatesheets(response.data);
      } catch (err) {
        console.error('Error fetching exam datesheets:', err);
        setError('Failed to fetch datesheets. Please try again later.');
      }
    };

    fetchExamDatesheets();
  }, []);

  if (error) return <div>{error}</div>; // Display error message
  if (examDatesheets.length === 0) return <div>Loading...</div>; // Display loading while data is being fetched

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-2xl rounded-lg mt-3">
      <h2 className="text-2xl font-bold text-center mb-6">Datesheets for {examDatesheets[0].class} class</h2>

      {examDatesheets.map((examDatesheet, index) => {
        // Check if subjects exist and are an array
        const subjects = Array.isArray(examDatesheet.subjects) ? examDatesheet.subjects : [];

        // Sort subjects by exam date
        const sortedSubjects = sortByExamDate(subjects);

        return (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold mb-4"> Exam: {examDatesheet.examName}</h3>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-center">Sr. No.</th>
                  <th className="py-2 px-4 text-center">Subject</th>
                  <th className="py-2 px-4 text-center">Date</th>
                  <th className="py-2 px-4 text-center">Timing</th>
                  <th className="py-2 px-4 text-center">Invigilator</th>
                  <th className="py-2 px-4 text-center">Room</th>
                  <th className="py-2 px-4 text-center">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 divide-y divide-gray-200">
                {sortedSubjects.map((subject, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-4 text-center">{idx + 1}</td>
                    <td className="py-2 px-4 text-center">{subject.subjectName}</td>
                    <td className="py-2 px-4 text-center">{formatDate(subject.examDate)}</td>
                    <td className="py-2 px-4 text-center">{subject.startTime} - {subject.endTime}</td>
                    <td className="py-2 px-4 text-center">{subject.invigilator}</td>
                    <td className="py-2 px-4 text-center">{subject.room}</td>
                    <td className="py-2 px-4 text-center">{subject.notes || '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default ExamDatesheet;
