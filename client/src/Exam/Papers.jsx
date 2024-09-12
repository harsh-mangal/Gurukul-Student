import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function StudentOldPapers() {
  const { className, sectionName } = useParams(); // Get class and section from URL
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch papers for the selected class and section
    axios.get(`http://localhost:5000/api/papers/getPapersByClassAndSection/5th/Rose`)
      .then((response) => {
        setPapers(response.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Error fetching papers");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-full mx-auto p-4 mt-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        {`Old Papers for Class ${className} - Section ${sectionName}`}
      </h1>

      {loading ? (
        <div className="text-center mt-10">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading papers...</p>
        </div>
      ) : papers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {papers.map((paper, index) => (
            <div key={index} className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{paper.title}</h3>
              <p className="text-gray-600 mb-4">{paper.description}</p>
              <div className="text-sm text-gray-500 mb-4">
                <p>Class: {paper.className}</p>
                <p>Subject: {paper.subjectName}</p>
              </div>
              <a
                href={`http://localhost:5000/uploads/${paper.paperFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300"
              >
                View Paper
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No papers found for this class and section.</p>
      )}
    </div>
  );
}

export default StudentOldPapers;
