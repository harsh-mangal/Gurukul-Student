import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import Font Awesome icons

const Last30DaysWithScroll = () => {
  const [last30Days, setLast30Days] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      daysArray.push(date.toISOString().split('T')[0]); // format to YYYY-MM-DD
    }

    setLast30Days(daysArray);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Scroll 300px to the left
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Scroll 300px to the right
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-teal-600">
        Last 30 Days
      </h1>
      <div className="flex items-center space-x-4">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="bg-teal-500 text-white p-3 rounded-full shadow-md hover:bg-teal-600 transition duration-300 flex items-center justify-center"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        {/* Scrollable Dates Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 p-2 scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-gray-200"
          style={{ scrollBehavior: 'smooth' }}
        >
          {last30Days.map((date, index) => (
            <div
              key={index}
              className="min-w-[150px] bg-teal-200 text-center p-4 rounded-lg shadow-lg hover:bg-teal-300 transition duration-300 flex items-center justify-center"
            >
              <span className="text-lg font-medium text-gray-700">{date}</span>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="bg-teal-500 text-white p-3 rounded-full shadow-md hover:bg-teal-600 transition duration-300 flex items-center justify-center"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Last30DaysWithScroll;
