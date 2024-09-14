import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import studentId from '../config';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    phoneNo: '',
    phoneNo2: '',
    email: '',
    gender: '',
    dob: '',
    age: '',
    state: '',
    city: '',
    address: '',
    class: '',
    section: '',
    rollNo: '',
    session: '',
    previousYearResult: '',
    transportationMode: "",
    routeName: "", // New field
    location: "", // New field
    routeCharges: "", // New field
    routeType: "",
    username: "", // New field
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`https://project-5zck.onrender.com/api/students/getStudents/${studentId}`);
        setStudent(response.data);
        setFormData({
          ...response.data,
          dob: response.data.dob ? new Date(response.data.dob).toISOString().split('T')[0] : '',
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Profile</h1>
      <hr />
      <br />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center row-span-3">
          <img
            src={student.image}
            alt={`${student.firstName} ${student.lastName}`}
            className="rounded-lg shadow-lg w-64 h-64 object-cover"
          />
        </div>
        {student.firstName && student.lastName && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Name:</strong>
            <div className="text-gray-900">{student.firstName} {student.lastName}</div>
          </div>
        )}

        {student.fatherName && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Father's Name:</strong>
            <div className="text-gray-900">{student.fatherName}</div>
          </div>
        )}

        {student.motherName && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Mother's Name:</strong>
            <div className="text-gray-900">{student.motherName}</div>
          </div>
        )}

        {student.phoneNo && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Phone Number:</strong>
            <div className="text-gray-900">{student.phoneNo}</div>
          </div>
        )}

        {student.phoneNo2 && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Alternate Phone Number:</strong>
            <div className="text-gray-900">{student.phoneNo2}</div>
          </div>
        )}

        {student.email && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Email:</strong>
            <div className="text-gray-900">{student.email}</div>
          </div>
        )}

        {student.gender && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Gender:</strong>
            <div className="text-gray-900">{student.gender}</div>
          </div>
        )}

        {student.dob && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Date of Birth:</strong>
            <div className="text-gray-900">{new Date(student.dob).toLocaleDateString()}</div>
          </div>
        )}

        {student.age && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Age:</strong>
            <div className="text-gray-900">{student.age}</div>
          </div>
        )}

        {student.state && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">State:</strong>
            <div className="text-gray-900">{student.state}</div>
          </div>
        )}

        {student.city && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">City:</strong>
            <div className="text-gray-900">{student.city}</div>
          </div>
        )}

        {student.address && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Address:</strong>
            <div className="text-gray-900">{student.address}</div>
          </div>
        )}

        {student.category && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Bus Charges:</strong>
            <div className="text-gray-900">{student.routeCharges}</div>
          </div>
        )}

        {student.financial && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Bus Charges:</strong>
            <div className="text-gray-900">{student.routeCharges}</div>
          </div>
        )}

        {student.class && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Class:</strong>
            <div className="text-gray-900">{student.class}</div>
          </div>
        )}

        {student.section && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Section:</strong>
            <div className="text-gray-900">{student.section}</div>
          </div>
        )}

        {student.rollNo && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Roll Number:</strong>
            <div className="text-gray-900">{student.rollNo}</div>
          </div>
        )}

        {student.session && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Session:</strong>
            <div className="text-gray-900">{student.session}</div>
          </div>
        )}

        {student.previousYearResult && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Previous Year Result:</strong>
            <div className="text-gray-900">{student.previousYearResult}</div>
          </div>
        )}

        {student.transportationMode && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Transportation Mode:</strong>
            <div className="text-gray-900">{student.transportationMode}</div>
          </div>
        )}

        {student.routeType && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Route Type:</strong>
            <div className="text-gray-900">{student.routeType}</div>
          </div>
        )}

        {student.routeName && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Bus Route:</strong>
            <div className="text-gray-900">{student.routeName}</div>
          </div>
        )}

        {student.location && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Location:</strong>
            <div className="text-gray-900">{student.location}</div>
          </div>
        )}

        {student.routeCharges > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Bus Charges:</strong>
            <div className="text-gray-900">{student.routeCharges}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;

