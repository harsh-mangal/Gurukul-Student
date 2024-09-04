import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentResultPage = () => {
  const { studentId } = useParams(); // Get studentId from the URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/examresults/getExamResultByStudent/66d2d1935592a8dabf88bf66`);
        setResults(response.data);
      } catch (error) {
        setError('Failed to fetch results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-8 mt-10 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Student Exam Results</h1>

        {loading && <p className="text-blue-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && results.length === 0 && (
          <p className="text-gray-700 text-center">No results found for this student.</p>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-10 w-full max-w-4xl">
          {results.map((result, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{result.examName}</h2>
              <p className="text-gray-700 mb-2"><strong>Class:</strong> {result.className}</p>
              <p className="text-gray-700 mb-4"><strong>Section:</strong> {result.sectionName}</p>

              <h3 className="text-lg font-medium text-gray-700 mb-2">Subjects & Scores</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-200 py-2">Subject</th>
                    <th className="border-b-2 border-gray-200 py-2">Total Marks</th>
                    <th className="border-b-2 border-gray-200 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {result.students.find(student => student.studentId === studentId).scores.map((score, i) => (
                    <tr key={i}>
                      <td className="border-b border-gray-200 py-2">{score.subjectName}</td>
                      <td className="border-b border-gray-200 py-2">{result.subjects.find(subject => subject.subjectName === score.subjectName).totalMarks}</td>
                      <td className="border-b border-gray-200 py-2">{score.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentResultPage;
