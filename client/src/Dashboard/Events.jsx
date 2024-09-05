import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import './EventByDate.css'; // Add custom CSS for event highlighting

const EventByDate = () => {
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
            filterEventsByDate(new Date(), response.data); // Filter events for today by default
        } catch (err) {
            setError("Failed to load events.");
        } finally {
            setLoading(false);
        }
    };

    // Handle date change and filter events
    const handleDateChange = (date) => {
        setSelectedDate(date);
        filterEventsByDate(date, events);
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
    const highlightDatesWithEvents = ({ date, view }) => {
        if (view === 'month') {
            const eventDates = events.map(event => new Date(event.date).toDateString());
            if (eventDates.includes(date.toDateString())) {
                return 'highlight-event-date'; // Add custom class for highlighting
            }
        }
    };

    return (
        <div className="min-h-auto-screen p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center">
            <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-md sm:max-w-3xl lg:max-w-5xl mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8 text-center">Event Calendar</h2>

                {/* Calendar and Event Section */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                    {/* Calendar */}
                    <div className="w-full sm:w-1/2 bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            className="border-2 border-indigo-300 rounded-lg"
                            tileClassName={highlightDatesWithEvents}
                        />
                        <p className="mt-4 text-center text-lg font-medium">
                            Selected Date: {selectedDate.toDateString()}
                        </p>
                    </div>

                    {/* Events of the Selected Date */}
                    <div className="w-full sm:w-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
                        <h4 className="text-lg sm:text-xl font-medium mb-4">Events on {selectedDate.toDateString()}</h4>
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

export default EventByDate;
