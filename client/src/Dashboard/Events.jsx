import React, { useState, useEffect } from "react";
import Calendar from "../Components/MyCalendar"; // Adjust path if needed
import axios from "axios";

const Events = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // Fetch all events on component mount
    useEffect(() => {
      fetchEvents();
    }, []);
  
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/events/getEvents');
        setEvents(response.data);
        filterEventsByDate(selectedDate, response.data); // Filter events for the default date
      } catch (err) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
  
    // Handle date change and filter events
    const handleDateChange = (day) => {
      const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      setSelectedDate(newDate);
      filterEventsByDate(newDate, events);
    };
  
    // Handle month change
    const handleMonthChange = (newMonth) => {
      // Update the calendar to the new month and year
      setSelectedDate(newMonth);
      filterEventsByDate(selectedDate, events);
    };
  
    // Filter events based on selected date
    const filterEventsByDate = (date, allEvents) => {
      const filtered = allEvents.filter(event => {
        const eventDate = new Date(event.date).toDateString();
        return eventDate === date.toDateString();
      });
      setFilteredEvents(filtered);
    };
  
    // Highlight dates that have events
    const highlightDatesWithEvents = (date) => {
      const eventDates = events.map(event => new Date(event.date).toDateString());
      return eventDates.includes(date.toDateString()) ? 'bg-yellow-200' : '';
    };
  
    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center">
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-md sm:max-w-3xl lg:max-w-5xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8 text-center">
            Event Calendar
          </h2>
  
          {/* Calendar and Event Section */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Calendar */}
            <div className="w-full sm:w-1/2 bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
              <Calendar
                handleDateChange={handleDateChange}
                highlightDatesWithEvents={highlightDatesWithEvents}
                selectedDate={selectedDate}
                onMonthChange={handleMonthChange}
              />
            </div>
  
            {/* Events of the Selected Date */}
            <div className="w-full sm:w-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h4 className="text-lg sm:text-xl font-medium mb-4">
                Events on {selectedDate.toDateString()}
              </h4>
              {loading ? (
                <p>Loading events...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : filteredEvents.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 border-b text-left">Sr. No.</th>
                        <th className="py-3 px-4 border-b text-left">Event Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100 transition-colors">
                          <td className="py-3 px-4 text-left">{index + 1}</td>
                          <td className="py-3 px-4 text-left">{event.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No events found for the selected date.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Events;
