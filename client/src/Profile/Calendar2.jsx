import React from "react";

// Function to format date to YYYY-MM-DD
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const Calendar = ({ handleDateChange, highlightDatesWithAttendance, selectedDate }) => {
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const monthDays = [];

    // Add days of the week headers
    monthDays.push(
      daysOfWeek.map((day, index) => (
        <div key={index} className="text-center font-semibold text-gray-600">
          {day}
        </div>
      ))
    );

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      monthDays.push(<div key={`empty-${i}`} className="border-b"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const formattedDate = formatDate(date);
      const isToday = formatDate(new Date()) === formattedDate;
      const isSelected = formatDate(selectedDate) === formattedDate;
      const highlightClass = highlightDatesWithAttendance(date);

      monthDays.push(
        <div
          key={day}
          className={`text-center py-2 border cursor-pointer rounded-lg transition duration-300 ease-in-out ${highlightClass} ${isToday ? "bg-blue-500 text-white" : ""} ${isSelected ? "bg-yellow-200" : ""}`}
          onClick={() => handleDateChange(day)}
        >
          {day}
        </div>
      );
    }

    return monthDays;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-7 gap-2">{generateCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
