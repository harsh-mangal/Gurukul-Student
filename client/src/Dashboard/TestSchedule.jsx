import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaUserTie, FaClock, FaMapMarkerAlt, FaStickyNote } from 'react-icons/fa'; // Icons for styling

function StudentTestSchedule() {
    const [studentId, setStudentId] = useState('');
    const [testSchedules, setTestSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTestSchedules = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/api/testschedules/getTestScheduleByClassNameAndSectionName/5th/Rose`);
            setTestSchedules(response.data);
        } catch (err) {
            setError('Failed to fetch test schedules');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTestSchedules();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Test Schedule</h2>

            {!loading && !error && testSchedules.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testSchedules.map((schedule) => (
                        <div key={schedule._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{schedule.testName}</h3>
                            <p className="text-gray-500 mb-4">{schedule.subject}</p>

                            <div className="flex items-center text-gray-700 mb-2">
                                <FaCalendarAlt className="mr-2 text-blue-500" />
                                <span>{new Date(schedule.date).toLocaleDateString()}</span>
                            </div>

                            <div className="flex items-center text-gray-700 mb-2">
                                <FaClock className="mr-2 text-blue-500" />
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                            </div>

                            <div className="flex items-center text-gray-700 mb-2">
                                <FaUserTie className="mr-2 text-blue-500" />
                                <span>Invigilator: {schedule.invigilator}</span>
                            </div>

                            <div className="flex items-center text-gray-700">
                                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                                <span>Room: {schedule.roomNumber}</span>
                            </div>

                            {schedule.additionalNote && (
                                <div className="mt-4 p-4 bg-blue-100 text-blue-800 rounded-lg">
                                    <FaStickyNote className="mr-2 text-blue-500" />
                                    <span>Note: {schedule.additionalNote}</span>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && testSchedules.length === 0 && (
                <p className="text-center text-gray-600">No test schedule found for the provided Student ID.</p>
            )}
        </div>
    );
}

export default StudentTestSchedule;
