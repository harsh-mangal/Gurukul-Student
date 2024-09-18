import React, { useEffect, useState } from 'react';
import { fetchSchoolData, getPhone1, getEmail1 } from '../Schoolinfo.js';

// Icons (using FontAwesome or any other library)
import { FaPhoneAlt, FaEnvelope, FaAddressBook } from 'react-icons/fa';

const ContactDiv = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSchoolData();
        setContactInfo({
          phone: getPhone1(),
          email: getEmail1()
        });
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-full mx-auto my-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-lg p-3">
      <div className="flex justify-center items-center mb-4">
        {/* Heading with Icon */}
        <FaAddressBook className="text-blue-600 text-lg mr-2" />
        <h2 className="text-lg font-semibold text-center">Contact Information</h2>
      </div>

      <div className="flex justify-between items-center">
        {/* Phone */}
        <div className="flex items-center space-x-2">
          <FaPhoneAlt className="text-blue-600" />
          <span className="text-sm">{contactInfo.phone}</span>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-blue-600" />
          <span className="text-sm">{contactInfo.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactDiv;
