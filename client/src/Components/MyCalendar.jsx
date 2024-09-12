import React, { useState } from "react";

const MyCalendar = ({ handleDateChange, highlightDatesWithEvents, selectedDate, onMonthChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
    onMonthChange(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
    onMonthChange(nextMonth);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
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
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isEventDay = highlightDatesWithEvents(date);

      monthDays.push(
        <div
          key={day}
          className={`text-center py-2 border cursor-pointer rounded-lg transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black ${
           isEventDay ? "bg-blue-800 text-white" : ""
          } ${isToday ? "bg-green-500 text-white" : ""} ${
            isSelected ? "bg-gray-300" : ""
          }`}
          onClick={() => handleDateChange(day)}
        >
          {day}
        </div>
      );
    }

    return monthDays;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
      <button
            onClick={handlePrevMonth}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
          >
            <i className="fas fa-chevron-left mr-1 md:mr-2"></i>
            <span className="hidden md:inline">Previous</span>
          </button>
        <div className="text-lg font-semibold">
          {currentMonthName} {currentYear}
        </div>
        <button
            onClick={handleNextMonth}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
          >
             <span className="hidden md:inline">Next</span>
            <i className="fas fa-chevron-right ml-1 md:ml-2"></i>
          </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default MyCalendar;
