import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import studentId from '../config'; // Ensure this is the correct path

const Last30DaysWithScroll = () => {
  const [last30Days, setLast30Days] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      daysArray.push(date.toISOString().split('T')[0]);
    }

    setLast30Days(daysArray);
  }, []);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchStudentAndHomework = async () => {
      try {
        const studentResponse = await axios.get(
          `http://localhost:5000/api/students/getStudents/${studentId}`
        );
        const student = studentResponse.data;

        const homeworkResponse = await axios.get(
          `http://localhost:5000/api/homework/getHomeworkByClassAndSectionName/${student.class}/${student.section}`
        );
        setHomeworkData(homeworkResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentAndHomework();
  }, []);

  // Scroll to center the selected date in the view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const scrollContainerWidth = scrollContainerRef.current.clientWidth;
      const targetOffset = (scrollWidth / last30Days.length) * selectedDateIndex;
      scrollContainerRef.current.scrollTo({
        left: targetOffset - scrollContainerWidth / 2 + (scrollWidth / last30Days.length) / 2, // Center the date
        behavior: 'smooth',
      });
    }
  }, [selectedDateIndex, last30Days]);

  const scrollLeft = () => {
    if (selectedDateIndex > 0) {
      setSelectedDateIndex(selectedDateIndex - 1);
    } else {
      setSelectedDateIndex(last30Days.length - 1);
    }
  };

  const scrollRight = () => {
    if (selectedDateIndex < last30Days.length - 1) {
      setSelectedDateIndex(selectedDateIndex + 1);
    } else {
      setSelectedDateIndex(0);
    }
  };


  const filteredHomework = last30Days[selectedDateIndex] &&
  homeworkData.find((item) => item._id === last30Days[selectedDateIndex])
    ?.homeworkList || [];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-1 md:p-4">
      {/* Date Scroll Section */}
      <div className="flex items-center space-x-3">
        <button
          onClick={scrollLeft}
          className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden space-x-4 p-2 w-full relative"
          style={{ scrollBehavior: 'smooth' }}
        >
          {last30Days.map((date, index) => (
            <div
              key={index}
              onClick={() => setSelectedDateIndex(index)}
              className={`min-w-[150px] bg-blue-200 text-center p-4 rounded-lg shadow-lg hover:bg-blue-300 transition duration-300 flex items-center justify-center cursor-pointer ${
                selectedDateIndex === index ? 'bg-blue-300' : ''
              } ${selectedDateIndex === index ? 'text-lg' : 'text-sm'} font-medium`}
            >
              <span className="text-sm font-medium text-gray-700">{formatDate(date)}</span>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>

      {/* Display Homework for Selected Date */}
      {last30Days[selectedDateIndex] && (
        <div className="mt-4">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold text-center mb-2">
          <i class="md:hidden fas fa-pencil-alt mr-2 text-red-400"></i>Homework for {formatDate(last30Days[selectedDateIndex])}
          </h2>

          {/* Laptop View - Table */}
          <div className="hidden md:block">
            {filteredHomework.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300">
                <thead className='bg-gray-200'>
                  <tr>
                    <th className="py-2 px-4 border-b">Sr No.</th>
                    <th className="py-2 px-4 border-b">Subject</th>
                    <th className="py-2 px-4 border-b">Homework</th>
                  </tr>
                </thead>
                <tbody className='bg-gray-50'>
                  {filteredHomework.map((homeworkItem, index) =>
                    Object.entries(homeworkItem.subject).map(([subject, homework], subIndex) => (
                      <tr key={subIndex} className="text-center hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{subIndex + 1}</td>
                        <td className="py-2 px-4 border-b">{subject}</td>
                        <td className="py-2 px-4 border-b">{homework}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No homework assigned for this date.</p>
            )}
          </div>

          {/* Mobile View - Cards */}
          <div className="md:hidden">
            {filteredHomework.length > 0 ? (
              <div className="space-y-2">
                {filteredHomework.map((homeworkItem, index) =>
                  Object.entries(homeworkItem.subject).map(([subject, homework], subIndex) => (
                    <div
                      key={subIndex}
                      className="bg-white rounded-md shadow-md p-3 flex items-center space-x-2"
                    >
                      <i className="fas fa-book text-blue-500"></i>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{subject}</p>
                        <p className="text-xs text-gray-500">{homework}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500">No homework assigned for this date.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Last30DaysWithScroll;
