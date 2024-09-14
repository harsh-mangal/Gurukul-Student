import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaUserClock } from 'react-icons/fa';
import studentId from '../config';

const AttendanceTimeline = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  // Fetch attendance data based on studentId
  useEffect(() => {
    axios.get(`http://localhost:5000/api/attendance/getAttendanceByStudentId/${studentId}`)
      .then((response) => {
        console.log('API Response:', response.data.students); // Log the response to see if data exists
        if (response.data && response.data.students) {
          setAttendanceData(response.data.students);
        }
      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error); // Log error if there's any issue with the API
      });
  }, []);
  

  // Determine icon and color based on attendance status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return <FaCheckCircle className="text-green-500" />;
      case 'Absent':
        return <FaTimesCircle className="text-red-500" />;
      case 'Late':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'onLeave':
        return <FaUserClock className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100';
      case 'Absent':
        return 'bg-red-100';
      case 'Late':
        return 'bg-yellow-100';
      case 'onLeave':
        return 'bg-gray-100';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Student Attendance Timeline</h1>

      <VerticalTimeline>
        {attendanceData.map((entry, index) => (
          <VerticalTimelineElement
            key={index}
            className={getStatusColor(entry.status)}
            contentStyle={{ background: '#f9fafb', color: '#333' }}
            contentArrowStyle={{ borderRight: '7px solid #f9fafb' }}
            date={new Date(entry.date).toDateString()}
            icon={getStatusIcon(entry.status)}
            iconStyle={{
              background: getStatusColor(entry.status),
              color: '#fff',
            }}
          >
            <h3 className="vertical-timeline-element-title font-semibold">Student ID: {entry.studentId}</h3>
            <h4 className="vertical-timeline-element-subtitle">Roll No: {entry.rollNo}</h4>
            <p>Status: {entry.status}</p>
            {entry.remark && <p className="text-gray-600">Remark: {entry.remark}</p>}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default AttendanceTimeline;
