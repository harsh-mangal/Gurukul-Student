import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/getStudents/66d18db1e677000e4ab754c8`);
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
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Name:</strong>
            <div className="text-gray-900">{student.firstName} {student.lastName}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Father's Name:</strong>
            <div className="text-gray-900">{student.fatherName}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Mother's Name:</strong>
            <div className="text-gray-900">{student.motherName}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Phone Number:</strong>
            <div className="text-gray-900">{student.phoneNo}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Alternate Phone Number:</strong>
            <div className="text-gray-900">{student.phoneNo2}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Email:</strong>
            <div className="text-gray-900">{student.email}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Gender:</strong>
            <div className="text-gray-900">{student.gender}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Date of Birth:</strong>
            <div className="text-gray-900">{new Date(student.dob).toLocaleDateString()}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Age:</strong>
            <div className="text-gray-900">{student.age}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">State:</strong>
            <div className="text-gray-900">{student.state}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">City:</strong>
            <div className="text-gray-900">{student.city}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Address:</strong>
            <div className="text-gray-900">{student.address}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Class:</strong>
            <div className="text-gray-900">{student.class}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Section:</strong>
            <div className="text-gray-900">{student.section}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Roll Number:</strong>
            <div className="text-gray-900">{student.rollNo}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Session:</strong>
            <div className="text-gray-900">{student.session}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <strong className="block text-gray-700">Previous Year Result:</strong>
            <div className="text-gray-900">{student.previousYearResult}</div>
          </div>
        </div>
    </div>
  );
};

export default StudentProfile;

