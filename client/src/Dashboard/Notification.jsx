import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the server
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications/getNotification');
        const allNotifications = response.data;
        const filteredNotifications = allNotifications
          .filter((notification) => notification.sendTo === 'students' || notification.sendTo === 'both')
          .map((notification) => ({
            ...notification,
            deleteDate: new Date(notification.deleteDate).toISOString().split('T')[0],
          }));
        setNotifications(filteredNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 mt-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Notifications
        </h2>

        {/* Notification List */}
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No notifications available at the moment.</p>
        ) : (
          <ul className="space-y-6">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(notification.deleteDate).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-700 mt-4">{notification.content}</p>
                {notification.attachFile && (
                  <a
                    href={notification.attachFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 mt-4 inline-block hover:underline"
                  >
                    View Attachment
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudentNotifications;
