import React from 'react';

const ExamResults = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-black">Exam Results</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Exam Datesheet */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-calendar-alt text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Exam Datesheet</h2>
            </div>
            <p className="text-gray-700">View upcoming exam dates and schedule.</p>
            {/* Add content related to exam datesheet here */}
          </div>

          {/* Results */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-poll-h text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Results</h2>
            </div>
            <p className="text-gray-700">Check your exam results and performance.</p>
            {/* Add content related to results here */}
          </div>

          {/* Grades */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-chart-line text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Grades</h2>
            </div>
            <p className="text-gray-700">View your grades for each subject.</p>
            {/* Add content related to grades here */}
          </div>

          {/* Previous Year Solutions */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-file-alt text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Previous Year Solutions</h2>
            </div>
            <p className="text-gray-700">Access solutions from previous years' exams.</p>
            {/* Add content related to previous year solutions here */}
          </div>

          {/* Papers */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center mb-4">
              <i className="fas fa-file-pdf text-blue-800 text-3xl mr-3"></i>
              <h2 className="text-2xl font-semibold text-black">Papers</h2>
            </div>
            <p className="text-gray-700">Download exam papers for practice.</p>
            {/* Add content related to exam papers here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
