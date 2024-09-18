import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodayThoughts = () => {
  const [thought, setThought] = useState(null);

  // Fetch today's thought from the backend API
  useEffect(() => {
    axios.get('http://localhost:5000/api/thoughts/getThoughts')
      .then(response => {
        setThought(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching today\'s thought:', error);
      });
  }, []);

  if (!thought) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-full mx-auto my-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg shadow-lg overflow-hidden">
    <div className="relative p-2 bg-white rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-pink-200 opacity-30 rounded-lg"></div>
      <h1 className="text-lg font-semibold mb-1 text-center">Thought of the Day</h1>
      <blockquote className="relative text-sm italic text-gray-800 leading-relaxed px-2">
        <span className="text-2xl text-red-300 font-bold">“</span>
        {thought.thought}
        <span className="text-2xl text-red-300 font-bold">”</span>
      </blockquote>
      <div className="mt-2 text-right">
        <p className="text-xs text-red-500 font-semibold">- {thought.author}</p>
        <p className="text-xs text-gray-500">{thought.date}</p>
      </div>
    </div>
  </div>
  
  );
};

export default TodayThoughts;
