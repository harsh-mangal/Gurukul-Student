import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPaperclip, FiAlertCircle } from 'react-icons/fi';

function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch notifications from the server
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://project-5zck.onrender.com/api/notifications/getNotification');
        const allNotifications = response.data;
        const filteredNotifications = allNotifications
          .filter((notification) => notification.sendTo === 'students' || notification.sendTo === 'both')
          .map((notification) => ({
            ...notification,
            deleteDate: new Date(notification.deleteDate).toISOString().split('T')[0],
          }));

        // Sort notifications by deleteDate in descending order (newest first)
        const sortedNotifications = filteredNotifications.sort((a, b) => new Date(b.deleteDate) - new Date(a.deleteDate));

        setNotifications(sortedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false); // End loading after fetch
      }
    };

    fetchNotifications();
  }, []);

  // Helper function to format date in dd-mm-yyyy format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 mt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
          Student Notifications
        </h2>

        {/* Loader while fetching */}
        {loading ? (
          <div className="flex justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        ) : (
          <>
            {/* Notification List */}
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No notifications available at the moment.</p>
            ) : (
              <ul className="space-y-6">
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className={`bg-white border ${new Date(notification.deleteDate) < new Date() ? 'border-red-300' : 'border-gray-200'} 
                    rounded-lg p-4 md:p-6 shadow-md transition-transform transform hover:shadow-xl transition-shadow duration-300`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      <p className={`text-sm ${new Date(notification.deleteDate) < new Date() ? 'text-red-500' : 'text-gray-500'} mt-2 md:mt-0`}>
                        {/* Format the deleteDate to dd-mm-yyyy */}
                        {formatDate(notification.deleteDate)}
                      </p>
                    </div>

                    <p className="text-gray-700 mt-4 text-sm md:text-base">{notification.content}</p>

                    {/* Attachment Icon */}
                    {notification.attachFile && (
                      <a
                        href={notification.attachFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 mt-4 inline-flex items-center hover:underline"
                      >
                        <FiPaperclip className="mr-2" /> View Attachment
                      </a>
                    )}

                    {/* Expired Notification Alert */}
                    {new Date(notification.deleteDate) < new Date() && (
                      <div className="mt-4 text-red-500 flex items-center">
                        <FiAlertCircle className="mr-2" /> This notification has expired.
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default StudentNotifications;
