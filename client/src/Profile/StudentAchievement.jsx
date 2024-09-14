import React, { useState, useEffect } from 'react';
import axios from 'axios';
import studentId from '../config';

const StudentAchievementsPage = ({ className, sectionName }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const fetchAchievements = async () => {
      if (student) {
        try {
          const response = await axios.get(`http://localhost:5000/api/studentAchievements/getAchievementsByClassAndSection/${student.class}/${student.section}`);
          setAchievements(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchAchievements();
  }, [student]);

  if (loading) return <div className="text-center py-6 text-lg">Loading achievements...</div>;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
        <i className="fas fa-award text-yellow-500 mr-2 lg:hidden lg:inline"></i> Student Achievements
      </h1>

      {achievements.length === 0 ? (
        <div className="text-center text-lg">
          <i className="fas fa-exclamation-circle text-red-500 mr-2 lg:hidden lg:inline"></i>
          No achievements found for this class and section.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {achievements.map((achievement) => (
            <div key={achievement._id} className="bg-white shadow-lg rounded-lg p-4 sm:p-6 relative transition-transform transform hover:scale-105">
              <div className="flex items-center mb-2 sm:mb-4">
                <i className="fas fa-trophy text-yellow-500 text-2xl sm:text-3xl mr-2 lg:hidden lg:inline"></i>
                <h2 className="text-xl sm:text-2xl font-bold">{achievement.eventName}</h2>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mb-1">
                <i className="far fa-calendar-alt text-blue-500 mr-1"></i>
                {new Date(achievement.eventDate).toLocaleDateString()}
              </p>
              <p className="text-sm sm:text-base mt-2">{achievement.shortDescription}</p>
              {achievement.longDescription && (
                <p className="text-gray-700 text-sm sm:text-base mb-2">{achievement.longDescription}</p>
              )}
              <div className="absolute top-2 right-2 text-green-500">
                <i className="fas fa-check-circle lg:hidden lg:inline"></i>
              </div>
              <div className="bg-gray-100 p-2 sm:p-4 mt-2 flex justify-between items-center text-sm sm:text-base">
                <span className="text-gray-600">
                  <i className="fas fa-school text-red-500 mr-1"></i> Class {achievement.className}, Section {achievement.sectionName}
                </span>
                <i className="fas fa-medal text-red-500 text-base lg:hidden lg:inline"></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentAchievementsPage;
