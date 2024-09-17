import React, { useEffect, useState } from 'react';
import axios from 'axios';
import studentId from '../config'; // Assuming the studentId is correctly imported
import { fetchAndRankStudentBySection, fetchAndRankStudentByClass } from './Rank.js'; // Adjust the path as necessary
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table formatting

const Results = () => {
  const [studentResult, setStudentResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionRank, setSectionRank] = useState(null);
  const [classRank, setClassRank] = useState(null);

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
    const fetchStudentResult = async () => {
      try {
        // Fetch student result first to get the class
        const response = await axios.get(`http://localhost:5000/api/examresults/getExamResultByStudent/${studentId}`);
        const student = response.data[0]; // Assuming data is an array and we want the first item
    
        if (student) {
          const studentClass = student.className; // Extract student class
    
          // Fetch rank data using the student class
          const sectionRanks = await fetchAndRankStudentBySection(studentClass); // Pass the class dynamically
          const classRanks = await fetchAndRankStudentByClass(studentClass); // Pass the class dynamically
    
          // Set ranks based on the fetched data
          setSectionRank(sectionRanks.rank || 'N/A');
          
          // Assuming classRanks object has structure like {10th: { rank: 4, studentName: 'sanjay Mangal' }}
          const classRankData = classRanks[studentClass]; // Access the student class key
          setClassRank(classRankData ? classRankData.rank : 'N/A');
          
          // Set student result
          setStudentResult(response.data);
        }
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

  if (loading) return (
    <div className="text-center mt-8 p-4 text-gray-700 text-sm">
      Loading... <i className="fas fa-spinner fa-spin text-lg"></i>
    </div>
  );

  if (error) return <div className="text-center mt-8 p-4 text-red-500 text-sm">{error}</div>;
  const generatePDF = (result) => {
    const doc = new jsPDF();

    // Set the document properties and styles
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`Exam Result for ${result.className} (${result.sectionName})`, 14, 20);
    
    doc.setFont('helvetica','normal');
    doc.setFontSize(12);
    doc.text(`Exam: ${result.examName}`, 14, 30);
    doc.text(`Name: ${result.students[0].studentName}`, 14, 35);
    doc.text(`Roll No: ${result.students[0].rollNo}`, 14, 40);
    doc.text(`Remark: ${result.students[0].remark || '--'}`, 14, 45);

    // Add table
  const tableColumn = ["Sr No.", "Subject", "Score", "Total Marks"];
  const tableRows = result.students[0].scores.map((score, index) => [
    index + 1,
    score.subjectName,
    score.score,
    result.subjects.find(subject => subject.subjectName === score.subjectName).totalMarks,
  ]);

  doc.autoTable(tableColumn, tableRows, { startY: 50 });
  
  // Add total and percentage at the end
  const totalMarks = result.students[0].scores.reduce((total, score) => total + score.score, 0);
  const maxMarks = result.subjects.reduce((total, subject) => total + subject.totalMarks, 0);
  const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);

  doc.text(`Total Marks: ${totalMarks}/${maxMarks}`, 14, doc.autoTable.previous.finalY + 10);
  doc.text(`Percentage: ${percentage}%`, 14, doc.autoTable.previous.finalY + 20);

  // Save the PDF
  doc.save(`Exam_Result_${result.examName}.pdf`);
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
        <i className="lg:hidden sm:hidden fas fa-graduation-cap text-green-600 mr-2"></i>Exam Result
      </h2>

      {studentResult && studentResult.map((result) => {
        const totalMarks = calculateTotalMarks(result);
        const maxMarks = calculateMaximumMarks(result);
        const percentage = calculatePercentage(totalMarks, maxMarks);
        
        return (
          <div key={result._id} className="p-2 lg:p-4 rounded-lg shadow hover:shadow-xl transition-shadow mb-6">
            <h3 className="text-s sm:text-xl font-semibold lg:mb-3 text-gray-700">
              {result.className} ({result.sectionName}) - {result.examName}
            </h3>
            <p className="text-sm sm:text-md">
              <i className="lg:hidden sm:hidden fas fa-user text-sky-400 mr-2"></i>Name: {result.students[0].studentName}
            </p>
            <p className="text-sm sm:text-md">
              <i className="lg:hidden fas fa-id-badge text-yellow-8 00 mr-2"></i>Roll No: {result.students[0].rollNo}
            </p>
            <p className="text-sm sm:text-md">
              <i className="lg:hidden fas fa-clipboard text-green-600 mr-2"></i>Remark: {result.students[0].remark}
              <i className="lg:hidden sm:hidden fas fa-id-badge text-yellow-400 mr-2"></i>Roll No: {result.students[0].rollNo}
            </p>
            <p className="text-sm sm:text-md mb-2">
              <i className="lg:hidden sm:hidden fas fa-clipboard text-red-400 mr-2"></i>Remark: {result.students[0].remark}
            </p>

            {/* Display ranks */}
            <div className="mb-4">
              <p className="text-sm sm:text-md">
                <i className="fas fa-medal text-yellow-500 mr-2"></i>Section Rank: {sectionRank || 'N/A'}
              </p>
              <p className="text-sm sm:text-md">
                <i className="fas fa-trophy text-yellow-500 mr-2"></i>Class Rank: {classRank || 'N/A'}
              </p>
            </div>

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
                        {result.subjects.find(subject => subject.subjectName === score.subjectName)?.totalMarks}
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

            {/* Button to download PDF for each result */}
            <div className="flex justify-end mt-4">
            <button
              className="bg-blue-800 hover:bg-blue-600 text-white py-2 px-2 rounded"
              onClick={() => generatePDF(result)}
            >
              Download PDF for {result.examName}
            </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
