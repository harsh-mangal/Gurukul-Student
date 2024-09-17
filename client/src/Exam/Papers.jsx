import React, { useState, useEffect } from "react";
import axios from "axios";
import studentId from '../config'; // Assuming the studentId is correctly imported

function Papers() {
  const [papers, setPapers] = useState([]);
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
      // Fetch papers for the selected class and section
      axios.get(`http://localhost:5000/api/papers/getPapersByClassAndSection/${student.class}/${student.section}`)
        .then((response) => {
          setPapers(response.data);
          setLoading(false);
        })
        .catch(() => {
          alert("Error fetching papers");
          setLoading(false);
        });
    }
  }, [student]);

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-4 sm:py-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center justify-center">
        {student ? (
          <>
            <i className="fas fa-file-alt text-purple-600 mr-2 lg:hidden sm:hidden text-lg"></i>
            Old Papers for {student.class} ({student.section})
          </>
        ) : (
          'Loading student details...'
        )}
      </h1>

      {loading ? (
        <div className="text-center mt-12">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 sm:h-16 sm:w-16 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-sm sm:text-base">Loading papers...</p>
        </div>
      ) : papers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {papers.map((paper) => (
            <div key={paper._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                  <i className="fas fa-book text-green-600 mr-2 lg:hidden sm:hidden text-lg"></i>
                  {paper.title}
                </h3>
                <p className="text-gray-700 mb-2 sm:mb-4 text-sm sm:text-base">{paper.description}</p>
                <div className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 flex items-center">
                  <i className="lg:hidden sm:hidden fas fa-chalkboard text-yellow-500 mr-1 sm:mr-2"></i>
                  Subject: {paper.subjectName}
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <a href={paper.paperFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center text-sm sm:text-base">
                    <i className="fas fa-eye mr-1 sm:mr-2"></i>View
                  </a>
                  <a href={`http://localhost:5000/api/papers/download/${paper._id}`} download className="text-green-600 hover:text-green-800 flex items-center text-sm sm:text-base">
                    <i className="fas fa-download mr-1 sm:mr-2"></i>Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12 text-sm sm:text-base">
          <i className="fas fa-exclamation-circle text-red-500 mr-1 sm:mr-2"></i>
          No papers found for this class and section.
        </p>
      )}
    </div>
  );
}

export default Papers;
