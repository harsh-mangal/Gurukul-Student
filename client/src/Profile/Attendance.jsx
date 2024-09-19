import React, { useState, useEffect } from "react";
import axios from "axios";
import studentId from "../config"; // Assuming you have studentId from config

const Attendance = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [totalOnLeave, setTotalOnLeave] = useState(0);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/attendance/getAttendanceByStudentId/${studentId}`);
        setAttendanceData(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    fetchAttendance();
  }, []);

  const calculateTotals = (attendanceData) => {
    let presentCount = 0;
    let absentCount = 0;
    let onLeaveCount = 0;

    attendanceData.forEach(record => {
      record.students.forEach(student => {
        if (student.status === "Present") presentCount++;
        else if (student.status === "Absent") absentCount++;
        else if (student.status === "onLeave") onLeaveCount++;
      });
    });

    setTotalPresent(presentCount);
    setTotalAbsent(absentCount);
    setTotalOnLeave(onLeaveCount);
  };

  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthDays = [];

    monthDays.push(
      daysOfWeek.map((day, index) => (
        <div key={index} className="text-center font-semibold text-gray-600 text-xs sm:text-base">
          {day}
        </div>
      ))
    );

    for (let i = 0; i < firstDayOfWeek; i++) {
      monthDays.push(<div key={`empty-${i}`} className="border-b"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().getFullYear() === currentYear && new Date().getMonth() === currentMonth && new Date().getDate() === day;
      const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const attendanceRecord = attendanceData.find(record =>
        record.students.some(student => new Date(student.date).toLocaleDateString() === new Date(formattedDate).toLocaleDateString())
      );

      let attendanceStatusClass = "";
      if (attendanceRecord) {
        const studentAttendance = attendanceRecord.students.find(student =>
          new Date(student.date).toLocaleDateString() === new Date(formattedDate).toLocaleDateString()
        );

        if (studentAttendance) {
          if (studentAttendance.status === "Present") attendanceStatusClass = "bg-green-600 text-white";
          else if (studentAttendance.status === "Absent") attendanceStatusClass = "bg-red-500 text-white";
          else if (studentAttendance.status === "onLeave") attendanceStatusClass = "bg-yellow-400 text-white";
          else if (studentAttendance.status === "Late") attendanceStatusClass = "bg-orange-500 text-white";
        }
      }

      monthDays.push(
        <div
          key={day}
          className={`text-center py-2 border cursor-pointer rounded-lg transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black ${
            attendanceStatusClass
          } ${isToday ? "bg-green-500 text-white" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return monthDays;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const selectedRecord = attendanceData.find(record =>
      record.students.some(student => new Date(student.date).toLocaleDateString() === new Date(formattedDate).toLocaleDateString())
    );
    if (selectedRecord) {
      const studentAttendance = selectedRecord.students.find(student =>
        new Date(student.date).toLocaleDateString() === new Date(formattedDate).toLocaleDateString()
      );
      setSelectedAttendance(studentAttendance);
      setSelectedDate(new Date(currentYear, currentMonth, day).toLocaleDateString());
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonth];

  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md w-full mt-2 max-w-sm sm:max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
        >
          <i className="fas fa-chevron-left mr-1"></i>
          <span className="hidden sm:inline">Previous</span>
        </button>
        <div className="text-base sm:text-lg font-semibold">
          {currentMonthName} {currentYear}
        </div>
        <button
          onClick={handleNextMonth}
          className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
        >
          <span className="hidden sm:inline">Next</span>
          <i className="fas fa-chevron-right ml-1"></i>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {generateCalendarDays()}
      </div>

{/* Total Count Summary */}
<div className="mt-4">
  <h3 className="text-lg font-semibold mb-2">Attendance Summary:</h3>
  <div className="flex flex-col sm:flex-row sm:justify-between">
    <div className="text-green-600 font-semibold">
      Present: {totalPresent}
    </div>
    <div className="text-red-500 font-semibold">
      Absent: {totalAbsent}
    </div>
    <div className="text-orange-500 font-semibold">
      On Leave: {totalOnLeave}
    </div>
  </div>
</div>

{/* Color Legend */}
<div className="mt-4">
  <h3 className="text-lg font-semibold mb-2">Legend:</h3>
  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center mb-2">
      <div className="w-4 h-4 bg-green-600 mr-2 rounded-full"></div>
      <span>Present</span>
    </div>
    <div className="flex items-center mb-2">
      <div className="w-4 h-4 bg-red-500 mr-2 rounded-full"></div>
      <span>Absent</span>
    </div>
    <div className="flex items-center mb-2">
      <div className="w-4 h-4 bg-orange-500 mr-2 rounded-full"></div>
      <span>On Leave</span>
    </div>
    <div className="flex items-center mb-2">
      <div className="w-4 h-4 bg-yellow-400 mr-2 rounded-full"></div>
      <span>Late</span>
    </div>
  </div>



      {showModal && selectedAttendance && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Attendance Details</p>
                <button onClick={handleCloseModal} className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring">✕</button>
              </div>
              <div className="text-xl font-semibold mb-4">Date: {selectedDate}</div>
              <div className="text-lg">
                <span className="font-bold">Status: </span>
                <span className={`${
                  selectedAttendance.status === "Present"
                    ? "text-green-500"
                    : selectedAttendance.status === "Absent"
                    ? "text-red-500"
                    : selectedAttendance.status === "Late"
                    ? "text-yellow-500"
                    : selectedAttendance.status === "onLeave"
                    ? "text-orange-500"
                    : ""
                }`}>
                  {selectedAttendance.status}
                </span>
              </div>
              {selectedAttendance.remark && (
                <div className="text-lg mt-2">
                  <span className="font-bold">Remark: </span> {selectedAttendance.remark}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Attendance;
