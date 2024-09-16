import React, { useState, useEffect } from "react";
import axios from "axios";
import MyCalendar from "../Components/MyCalendar";
import studentId from '../config';

const AttendanceCalendar = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/attendance/getAttendanceByStudentId/${studentId}`)
      .then((response) => {
        if (response.data && response.data.students) {
          setAttendanceData(response.data.students);
          console.log("Attendance data fetched successfully:", response.data.students);
        }
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const onMonthChange = (month) => {
    console.log("Month changed:", month);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Student Attendance Calendar</h1>
      <MyCalendar
        handleDateChange={handleDateChange}
        attendanceData={attendanceData}
        selectedDate={selectedDate}
        onMonthChange={onMonthChange}
      />
    </div>
  );
};

export default AttendanceCalendar;
