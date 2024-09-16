import React, { useEffect, useState } from 'react';
import axios from 'axios';
import studentId from '../config'; // Assuming the studentId is correctly imported

const Results = () => {
  const [studentResult, setStudentResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentResult = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/examresults/getExamResultByStudent/${studentId}`);
        setStudentResult(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentResult();
  }, [studentId]);

  const calculateTotalMarks = (result) => {
    return result.students[0].scores.reduce((total, score) => total + score.score, 0);
  };

  const calculateMaximumMarks = (result) => {
    return result.subjects.reduce((total, subject) => total + subject.totalMarks, 0);
  };

  const calculatePercentage = (totalMarks, maxMarks) => {
    return ((totalMarks / maxMarks) * 100).toFixed(2);
  };

  if (loading)
    return (
      <div className="text-center mt-8 p-4 text-gray-700 text-sm">
        Loading... <i className="fas fa-spinner fa-spin text-lg"></i>
      </div>
    );
  if (error)
    return <div className="text-center mt-8 p-4 text-red-500 text-sm">{error}</div>;

  return (
    <div className="container mx-auto lg:mt-4 p-2 lg:p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-gray-800">
        <i className="lg:hidden fas fa-graduation-cap text-red-400 mr-2"></i>Exam Result
      </h2>
      {studentResult.map((result) => {
        const totalMarks = calculateTotalMarks(result);
        const maxMarks = calculateMaximumMarks(result);
        const percentage = calculatePercentage(totalMarks, maxMarks);

        return (
          <div key={result._id} className="p-2 lg:p-4 rounded-lg shadow hover:shadow-xl transition-shadow">
            <h3 className="text-s sm:text-xl font-semibold lg:mb-3 text-gray-700">
              {result.className} ({result.sectionName}) - {result.examName}
            </h3>
            <p className="text-sm sm:text-md">
              <i className="lg:hidden fas fa-user text-sky-400 mr-2"></i>Name: {result.students[0].studentName}
            </p>
            <p className="text-sm sm:text-md">
              <i className="lg:hidden fas fa-id-badge text-yellow-400 mr-2"></i>Roll No: {result.students[0].rollNo}
            </p>
            <p className="text-sm sm:text-md mb-2">
              <i className="lg:hidden fas fa-clipboard text-green-600 mr-2"></i>Remark: {result.students[0].remark}
            </p>

            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-white border-collapse rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="px-2 py-1 text-xs sm:text-sm">Sr No.</th>
                    <th className="px-2 py-1 text-xs sm:text-sm">Subject</th>
                    <th className="px-2 py-1 text-xs sm:text-sm">Score</th>
                    <th className="px-2 py-1 text-xs sm:text-sm">Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {result.students[0].scores.map((score, index) => (
                    <tr key={index} className="text-center text-sm sm:text-base hover:bg-gray-100">
                      <td className="border px-3 py-2">{index + 1}</td>
                      <td className="border px-3 py-2">{score.subjectName}</td>
                      <td className="border px-3 py-2">{score.score}</td>
                      <td className="border px-3 py-2">
                        {result.subjects.find(subject => subject.subjectName === score.subjectName).totalMarks}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold text-center text-sm sm:text-base bg-gray-200">
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2">Total</td>
                    <td className="border px-3 py-2" colSpan="2">
                      {totalMarks}/{maxMarks}
                    </td>
                  </tr>
                  <tr className="font-semibold text-center text-sm sm:text-base bg-gray-200">
                    <td className="border px-3 py-1"></td>
                    <td className="border px-3 py-1">Percentage</td>
                    <td className="border px-3 py-1" colSpan="2">
                      {percentage}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
