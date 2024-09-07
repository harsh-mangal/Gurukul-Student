import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseMaterialStudentPage = () => {
    const { className, sectionName } = useParams();
    const [courseMaterials, setCourseMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseMaterials = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/coursematerial/getCourseMaterialByClassAndSection/5th/Rose`);
                setCourseMaterials(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course materials:', error);
                alert('Error fetching course materials');
                setLoading(false);
            }
        };

        fetchCourseMaterials();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-6 mt-5">
                Course Materials for {className} - {sectionName}
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-xl text-gray-500">Loading...</div>
                </div>
            ) : courseMaterials.length === 0 ? (
                <div className="text-center text-xl text-gray-500">No course materials available</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-center bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="py-2 px-4 text-gray-700">#</th>
                                <th className="py-2 px-4 text-gray-700">Subject</th>
                                <th className="py-2 px-4 text-gray-700">Title</th>
                                <th className="py-2 px-4 text-gray-700">Description</th>
                                <th className="py-2 px-4 text-gray-700">File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseMaterials.map((material, index) => (
                                <tr
                                    key={material._id}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{index + 1}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{material.subjectName}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{material.title}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">{material.description || 'No description'}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                                        <a href={material.courseMaterialFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            View File
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CourseMaterialStudentPage;
