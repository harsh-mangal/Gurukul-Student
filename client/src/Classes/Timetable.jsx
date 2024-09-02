import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewTimetable = () => {
  const { id } = useParams(); // Get the timetable ID from the URL
  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    // Fetch the timetable details by ID
    axios.get(`http://localhost:5000/api/timetable/getTimetableById/${id}`)
      .then(response => setTimetable(response.data))
      .catch(error => console.error('Error fetching timetable:', error));
  }, [id]);

  if (!timetable) return <div>Loading...</div>;

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
    if (timetable.assemblyTime) {
      const assemblyEndTime = addMinutes(timetable.assemblyTime, timetable.assemblyDuration);

      timeSlots.push({
        startTime: timetable.assemblyTime,
        endTime: assemblyEndTime,
        isAssembly: true
      });

      currentTime = assemblyEndTime;
    }

    // Calculate periods and lunch break times
    let periodCounter = 1;
    for (let i = 0; i < timetable.periodNumber; i++) {
      // Check if current period is the lunch break
      if (i === timetable.lunchBreakAfterPeriod) {
        // Calculate lunch break start and end times
        const lunchBreakStart = addMinutes(currentTime, timetable.periodDuration);
        const lunchBreakEnd = addMinutes(lunchBreakStart, timetable.lunchBreakDuration);

        timeSlots.push({
          startTime: lunchBreakStart,
          endTime: lunchBreakEnd,
          isLunchBreak: true
        });

        currentTime = lunchBreakEnd;
      }

      // Calculate period start and end times
      const periodEndTime = addMinutes(currentTime, timetable.periodDuration);
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
      <h1 className="text-2xl text-center font-bold mb-6">Timetable for Class: {timetable.className} ({timetable.sectionName})</h1>

      <table className="min-w-full bg-white border border-gray-300">
        <thead className='bg-gray-200'>
          <tr>
            <th className="py-2 px-4 border-b">Sr. No.</th>
            <th className="py-2 px-4 border-b">Timing</th>
            {Object.keys(timetable.timetable).map(day => (
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
              {Object.keys(timetable.timetable).map(day => {
                const period = timetable.timetable[day][slot.serialNumber - 1] || {};
                return (
                  <td key={day} className="py-2 px-4 border-b">
                    {slot.isAssembly || slot.isLunchBreak ? '--' : (
                      <div className="flex flex-col items-center">
                        <div className="  ">{period.subject || '--'}</div>
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
  );
};

export default ViewTimetable;

