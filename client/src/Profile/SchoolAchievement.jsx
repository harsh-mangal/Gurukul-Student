import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AchievementsPage = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/achievements/getAchievements');
                setAchievements(response.data);
            } catch (err) {
                setError('Failed to fetch achievements');
            } finally {
                setLoading(false);
            }
        };

        fetchAchievements();
    }, []);

    if (loading) return <div className="text-center p-8 text-gray-700 text-sm sm:text-base">Loading... <i className="fas fa-spinner fa-spin text-lg"></i></div>;
    if (error) return <div className="text-center p-8 text-red-500 text-sm sm:text-base">{error}</div>;

    return (
        <div className="container mx-auto p-2 sm:p-6 lg:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-6 text-center text-gray-800">
                <i className="sm:hidden fas fa-award text-red-500 mr-2 sm:mr-2 text-xl sm:text-2xl"></i>
                School Achievements
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {achievements.map((achievement) => (
                    <div key={achievement._id} className="bg-white p-2 sm:p-4 rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center mb-2 sm:mb-4">
                            <i className="sm:hidden fas fa-trophy text-yellow-500 mr-1 sm:mr-2 text-lg sm:text-xl"></i>
                            <h2 className="text-sm sm:text-lg font-semibold">{achievement.competitionTitle}</h2>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base mb-1">
                            <i className="far fa-calendar-alt text-blue-500 mr-1"></i>
                            {new Date(achievement.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                            <i className="sm:hidden fas fa-place-of-worship text-yellow-800 mr-1 sm:mr-2 text-sm sm:text-base"></i>
                            <strong>Place:</strong> {achievement.place}
                        </p>
                        <p className="text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                            <i className="sm:hidden fas fa-school text-red-500 mr-1 sm:mr-2 text-sm sm:text-base"></i>
                            <strong>School Rank:</strong> {achievement.schoolRank}
                        </p>
                        <p className="text-gray-700 mb-2 text-sm sm:text-base">
                            <i className="sm:hidden fas fa-info-circle text-green-500 mr-1 sm:mr-2 text-sm sm:text-base"></i>
                            <strong>Description:</strong> {achievement.description}
                        </p>
                        {achievement.image && (
                            <div className="flex space-x-4">
                                <a href={achievement.image} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center text-sm sm:text-base">
                                    <i className="fas fa-eye mr-2"></i>View
                                </a>
                                <a href={`http://localhost:5000/api/assignments/download/${achievement._id}`} download className="text-green-600 hover:underline flex items-center text-sm sm:text-base">
                                    <i className="fas fa-download mr-2"></i>Download
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsPage;
