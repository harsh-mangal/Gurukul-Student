import React, { useState, useEffect } from 'react';
import axios from 'axios';
import studentId from '../config';

const ViewTimetable = () => {
  const [timetable, setTimetable] = useState(null);
  const [filteredTimetable, setFilteredTimetable] = useState(null);
  const [student, setStudent] = useState(null);

  // Fetch the student details
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`https://project-5zck.onrender.com/api/students/getStudents/${studentId}`);
        setStudent(response.data);
      } catch (err) {
        console.error('Error fetching student:', err);
      }
    };

    fetchStudent();
  }, []);

  // Fetch all timetables and filter based on the student's class
  useEffect(() => {
    if (student) {
      axios.get(`https://project-5zck.onrender.com/api/timetable/getAllTimetables`)
        .then(response => {
          const fetchedTimetables = response.data;

          // Filter the timetable based on matching classes
          const filtered = fetchedTimetables.find(entry => entry.className === student.class && entry.sectionName === student.section);
          
          // Set the filtered timetable to state
          setFilteredTimetable(filtered);
        })
        .catch(error => console.error('Error fetching timetables:', error));
    }
  }, [student]);

  if (!filteredTimetable) return <div>Loading...</div>;

  // Helper function to add minutes to a time string
  const addMinutes = (time, minutes) => {
    const [hours, mins] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins + minutes);
    return date.toTimeString().slice(0, 5);
  };

  // Helper function to format time for display
  const formatTime = (start, end) => `${start} - ${end}`;

  const calculateTimeSlots = () => {
    const timeSlots = [];
    let currentTime = '08:00'; // Assuming the timetable starts at 08:00 AM

    // Add assembly time slot if available
    if (filteredTimetable.assemblyTime) {
      const assemblyEndTime = addMinutes(filteredTimetable.assemblyTime, filteredTimetable.assemblyDuration);

      timeSlots.push({
        startTime: filteredTimetable.assemblyTime,
        endTime: assemblyEndTime,
        isAssembly: true
      });

      currentTime = assemblyEndTime;
    }

    // Calculate periods and lunch break times
    let periodCounter = 1;
    for (let i = 0; i < filteredTimetable.periodNumber; i++) {
      // Check if current period is the lunch break
      if (i === filteredTimetable.lunchBreakAfterPeriod) {
        // Calculate lunch break start and end times
        const lunchBreakStart = addMinutes(currentTime, filteredTimetable.periodDuration);
        const lunchBreakEnd = addMinutes(lunchBreakStart, filteredTimetable.lunchBreakDuration);

        timeSlots.push({
          startTime: lunchBreakStart,
          endTime: lunchBreakEnd,
          isLunchBreak: true
        });

        currentTime = lunchBreakEnd;
      }

      // Calculate period start and end times
      const periodEndTime = addMinutes(currentTime, filteredTimetable.periodDuration);
      timeSlots.push({
        serialNumber: periodCounter,
        startTime: currentTime,
        endTime: periodEndTime,
        isLunchBreak: false
      });
      currentTime = periodEndTime;
      periodCounter++;
    }

    return timeSlots;
  };

  const timeSlots = calculateTimeSlots();

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-2xl rounded-lg mt-3">
      <h1 className="text-2xl text-center font-bold mb-6">Timetable for Class: {filteredTimetable.className} ({filteredTimetable.sectionName})</h1>

      {/* Mobile View */}
      <div className="block md:hidden">
        {Object.keys(filteredTimetable.timetable).map((day) => (
          <div key={day} className="mb-6">
            <h2 className="text-xl font-bold mb-4">{day}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {timeSlots.map((slot, index) => {
                const period = filteredTimetable.timetable[day][slot.serialNumber - 1] || {};
                return (
                  <div key={index} className="p-4 border rounded-lg shadow-md bg-gray-50">
                    <div className="font-semibold text-lg mb-2">
                      {slot.isAssembly
                        ? `Assembly (${formatTime(slot.startTime, slot.endTime)})`
                        : slot.isLunchBreak
                        ? `Lunch Break (${formatTime(slot.startTime, slot.endTime)})`
                        : `Period ${slot.serialNumber} (${formatTime(slot.startTime, slot.endTime)})`}
                    </div>
                    {!slot.isAssembly && !slot.isLunchBreak && (
                      <div className="text-sm">
                        <div>{period.subject || '--'}</div>
                        <div className="text-gray-500">Teacher: {period.teacher || '--'}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Laptop View */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">Sr. No.</th>
              <th className="py-2 px-4 border-b">Timing</th>
              {Object.keys(filteredTimetable.timetable).map(day => (
                <th key={day} className="py-2 px-4 border-b">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center bg-gray-100">
            {timeSlots.map((slot, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">
                  {slot.isAssembly || slot.isLunchBreak ? '' : slot.serialNumber}
                </td>
                <td className="py-2 px-4 border-b">
                  {slot.isAssembly
                    ? `Assembly (${formatTime(slot.startTime, slot.endTime)})`
                    : slot.isLunchBreak
                    ? `Lunch Break (${formatTime(slot.startTime, slot.endTime)})`
                    : formatTime(slot.startTime, slot.endTime)}
                </td>
                {Object.keys(filteredTimetable.timetable).map(day => {
                  const period = filteredTimetable.timetable[day][slot.serialNumber - 1] || {};
                  return (
                    <td key={day} className="py-2 px-4 border-b">
                      {slot.isAssembly || slot.isLunchBreak ? '--' : (
                        <div className="flex flex-col items-center">
                          <div>{period.subject || '--'}</div>
                          <div className="text-sm text-gray-600">({period.teacher || '--'})</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTimetable;
