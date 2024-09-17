import React, { useState, useEffect } from 'react';
import axios from 'axios';
import studentId from '../config'; // Assuming the studentId is correctly imported

function StudentTestSchedule() {
    const [testSchedules, setTestSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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

    const fetchTestSchedules = async () => {
        if (!student) return; // Exit if student data is not available

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/api/testschedules/getTestScheduleByClassNameAndSectionName/${student.class}/${student.section}`);
            setTestSchedules(response.data);
        } catch (err) {
            setError('Failed to fetch test schedules');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTestSchedules();
    }, [student]);

    return (
        <div className="container mx-auto p-2 sm:p-6 lg:p-8">
            {student ? (
                <>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-2 sm:mb-6">
                        <i className="lg:hidden sm:hidden fas fa-chalkboard-teacher text-blue-600 mr-2"></i> 
                        Test Schedule of {student.class} ({student.section})
                    </h2>

                    {!loading && !error && testSchedules.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {testSchedules.map((schedule) => (
                                <div key={schedule._id} className="bg-white p-2 sm:p-4 lg:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">
                                        <i className="lg:hidden sm:hidden fas fa-file-alt text-green-600 mr-2"></i>
                                        {schedule.testName}
                                    </h3>
                                    <p className="text-gray-500 mb-2 sm:mb-4 text-sm sm:text-base">
                                        <i className="lg:hidden sm:hidden fas fa-book text-red-500 mr-2"></i> 
                                        {schedule.subject}
                                    </p>

                                    <div className="flex items-center text-gray-700 mb-1 sm:mb-2 text-sm">
                                        <i className="fas fa-calendar-alt mr-1 sm:mr-2 text-blue-500"></i>
                                        <span>{new Date(schedule.date).toLocaleDateString()}</span>
                                    </div>

                                    <div className="flex items-center text-gray-700 mb-1 sm:mb-2 text-sm">
                                        <i className="lg:hidden sm:hidden fas fa-clock mr-1 sm:mr-2 text-purple-500"></i>
                                        <span>{schedule.startTime} - {schedule.endTime}</span>
                                    </div>

                                    <div className="flex items-center text-gray-700 mb-1 sm:mb-2 text-sm">
                                        <i className="lg:hidden sm:hidden fas fa-map-marker-alt mr-1 sm:mr-2 text-orange-500"></i>
                                        <span><strong>Room:</strong> {schedule.roomNumber}</span>
                                    </div>

                                    {schedule.additionalNote && (
                                        <div className="mt-3 sm:mt-4 p-2 sm:p-4 bg-blue-100 text-blue-800 rounded-lg text-sm">
                                            <i className="lg:hidden sm:hidden fas fa-sticky-note mr-2 text-teal-500"></i>
                                            <span>Note: {schedule.additionalNote}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && !error && testSchedules.length === 0 && (
                        <p className="text-center text-gray-600">No test schedule found for you.</p>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-600">Loading student details...</p>
            )}
        </div>
    );
}

export default StudentTestSchedule;
