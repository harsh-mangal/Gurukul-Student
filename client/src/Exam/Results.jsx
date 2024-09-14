import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentResultPage = () => {
  const [studentResult, setStudentResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const studentId = '66d2d1935592a8dabf88bf66'; // Replace with actual student ID

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

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Exam Result</h2>
      {studentResult.map(result => {
        const totalMarks = calculateTotalMarks(result);
        const maxMarks = calculateMaximumMarks(result);
        const percentage = calculatePercentage(totalMarks, maxMarks);

        return (
          <div key={result._id} className="mb-6">
            <h3 className="text-xl font-semibold">{result.className} ({result.sectionName}) {result.examName}</h3>
            <p className="text-md">Name: {result.students[0].studentName}</p>
            <p className="text-md">Roll No: {result.students[0].rollNo}</p>

            <table className="table-auto w-full mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Sr No.</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {result.students[0].scores.map((score, index) => (
                  <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{score.subjectName}</td>
                    <td className="border px-4 py-2">{score.score}</td>
                    <td className="border px-4 py-2">
                      {result.subjects.find(subject => subject.subjectName === score.subjectName).totalMarks}
                    </td>
                  </tr>
                ))}
                <tr className="font-semibold text-center">
                <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">Total</td>
                  <td className="border px-4 py-2" colSpan="2">{totalMarks}/{maxMarks}</td>
                </tr>
                <tr className="font-semibold text-center">
                <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">Percentage</td>
                  <td className="border px-4 py-2" colSpan="2">{percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default StudentResultPage;
