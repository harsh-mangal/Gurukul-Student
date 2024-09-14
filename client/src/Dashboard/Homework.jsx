import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get class and section from the URL
import axios from 'axios';

const HomeworkPage = () => {
  const { className, sectionName } = useParams(); // Get class and section from URL params
  const [homeworkData, setHomeworkData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the homework data
    const fetchHomework = async () => {
      try {
        const response = await axios.get(
          `https://project-5zck.onrender.com/api/homework/getHomeworkByClassAndSectionName/1st/Rose`
        );
        setHomeworkData(response.data);
      } catch (error) {
        console.error('Error fetching homework:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!homeworkData) {
    return <div className="text-center py-10">No homework found for this class and section.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Homework for {className} - {sectionName}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Assigned on: {homeworkData.dateAssigned}
        </p>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Sr No.</th>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Homework</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(homeworkData.homework).map(([subject, homework], index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{subject}</td>
                <td className="py-2 px-4 border-b">{homework}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeworkPage;
