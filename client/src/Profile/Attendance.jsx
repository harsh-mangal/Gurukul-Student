import React, { useState, useEffect } from "react";
import Calendar from "../Profile/Calendar2"; // Adjust path if needed
import axios from "axios";
import studentId from '../config'; // Assuming you have studentId somewhere in your config

const StudentAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all attendance records for a particular student on component mount
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/attendance/getAttendanceByStudentId/${studentId}`);
      setAttendanceRecords(response.data);
    } catch (err) {
      setError("Failed to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  // Normalize date to compare
  const normalizeDate = (date) => {
    return new Date(date).toDateString();
  };

  // Handle date change
  const handleDateChange = (day) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  // Highlight dates based on attendance status
  const highlightDatesWithAttendance = (date) => {
    const normalizedDate = normalizeDate(date);
    console.log(normalizedDate)
    const attendanceRecord = attendanceRecords.find(record => {
      return normalizeDate(record.date) === normalizedDate;
    });

    console.log(attendanceRecord)
    if (attendanceRecord) {
      switch (attendanceRecord.status) {
        case 'Present':
          return 'bg-green-400 text-white';
        case 'Absent':
          return 'bg-red-400 text-white';
        case 'onLeave':
          return 'bg-orange-400 text-white';
        case 'Late':
          return 'bg-yellow-400 text-white';
        default:
          return '';
      }
    }
    return ''; // No highlight if no attendance record found for this date
  };

  return (
    <div className="min-h-screen p-2 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-lg sm:p-6 md:p-8 w-full max-w-md sm:max-w-3xl lg:max-w-5xl mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-6 text-center text-gray-800">
          <i className="md:hidden fas fa-calendar-alt mr-2 text-green-600"></i>Attendance Calendar
        </h1>

        {/* Calendar and Attendance Section */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          {/* Calendar */}
          <div className="w-full sm:w-1/2 bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
            <Calendar
              handleDateChange={handleDateChange}
              highlightDatesWithAttendance={highlightDatesWithAttendance}
              selectedDate={selectedDate}
            />
          </div>

          {/* Attendance for the Selected Date */}
          <div className="w-full sm:w-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h4 className="text-lg sm:text-xl font-medium mb-4">
              Attendance on {selectedDate.toDateString()}
            </h4>
            {loading ? (
              <p>Loading attendance...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              attendanceRecords.filter(record => {
                return normalizeDate(record.date) === normalizeDate(selectedDate);
              }).map((record, index) => (
                <div key={index} className="mb-4">
                  <p>Status: <span className="font-bold">{record.status}</span></p>
                  {record.remark && <p>Remark: {record.remark}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
