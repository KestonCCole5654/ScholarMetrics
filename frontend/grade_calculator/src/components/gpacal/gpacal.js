import React from 'react'
import { Plus, Trash2 } from 'lucide-react';
import { useState } from "react";
import axios from "axios";
import UploadSection from '../module_pg/UploadSection/uploadsection';
import ScaleModal from '../scale/scale';

export default function GPACalculatorComponent() {
    const [courses, setCourses] = useState([{ name: "", credits: 0, grade: "" }]);
    const [gpa, setGPA] = useState(null);
    const [error, setError] = useState(null);
    const [gpaScale, setGpaScale] = useState("4.0");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const apiUrl = "http://localhost:5000"; // Adjust this for production


    const addCourse = () => {
        setCourses([...courses, { name: "", credits: 0, grade: "" }]);
    };


    const handleSaveScale = (newScale) => {
        setGpaScale(newScale);
    };

    const updateCourse = (index, field, value) => {
        const updatedCourses = courses.map((course, i) => {
            if (i === index) {
                return { ...course, [field]: field === "name" ? value : (field === "credits" ? parseFloat(value) : value) };
            }
            return course;
        });
        setCourses(updatedCourses);
    };

    const removeCourse = (index) => {
        setCourses(courses.filter((_, i) => i !== index));
    };

    const calculateGPA = async () => {
        try {
            const grades = courses.map((course) => [
                course.grade.toUpperCase(),
                course.credits,
            ]);

            const response = await axios.post(`${apiUrl}/calculate-gpa`, {
                grades,
                scale: gpaScale
            });

            setGPA(response.data.gpa);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };



    return (
        <div>
            <div>
                <UploadSection />
            </div>
            <div>
                or
            </div>


            {error && (
                <div className="bg-red-500 text-white p-4 rounded">
                    <p>Error: {error}</p>
                </div>
            )}



            <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                <h2 className="text-xl md:text-1xl font-semibold text-left mb-5">Enter Your Modules</h2>
                <div className="space-y-4">
                    {courses.map((course, index) => (
                        <div key={index} className="space-y-3 pb-4 border-b border-gray-700 last:border-0">
                            <div className="space-y-2">

                                <div className="flex flex-row  gap-4 items-center">
                                    <div className="flex-grow">
                                        <label className="block text-gray-400 mb-2 text-left">GPA Scale</label>
                                        <select
                                            value={gpaScale}
                                            onChange={(e) => setGpaScale(e.target.value)}
                                            className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                                        >
                                            <option value="4.0">4.0 scale</option>
                                            <option value="4.3">4.3 scale</option>
                                            <option value="5.0">5.0 scale</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-row pt-6'>
                                        <button className=" text-gray-400 font-bold py-5 px-4 rounded hover:text-orange-500"
                                            onClick={() => setIsModalOpen(true)}
                                        >

                                            Edit Scale...

                                        </button>

                                    </div>

                                </div>

                                <label className=" block text-gray-400 text-left ">Course Name</label>
                                <input
                                    type="text"
                                    value={course.name}
                                    onChange={(e) => updateCourse(index, "name", e.target.value)}
                                    placeholder="Enter course name"
                                    className="bg-gray-700 border border-gray-600 rounded  px-3 py-2 w-full text-white"
                                />
                            </div>

                            <div className="flex gap-4 py-4">
                                <div className="flex-1 space-y-2">
                                    <label className=" text-gray-400 block text-left ">Credits</label>
                                    <input
                                        type="number"
                                        value={course.credits || ""}
                                        onChange={(e) => updateCourse(index, "credits", e.target.value)}
                                        placeholder="Credits"
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className=" text-gray-400 block text-left">Grade</label>
                                    <input
                                        type="text"
                                        value={course.grade || ""}
                                        onChange={(e) => {
                                            const value = e.target.value.toUpperCase();
                                            if (value.length <= 2) {
                                                updateCourse(index, "grade", value);
                                            }
                                        }}
                                        placeholder="A, A-, B+"
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                    />
                                </div>
                                <button
                                    onClick={() => removeCourse(index)}
                                    className="self-end h-10 w-10 flex items-center justify-center text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <button
                        onClick={addCourse}
                        className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 flex items-center justify-center"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Add Module
                    </button>
                    <button
                        onClick={calculateGPA}
                        className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 flex-1 md:flex-none"
                    >
                        Calculate GPA
                    </button>
                </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                <h2 className="text-xl md:text-1xl font-semibold mb-4">Results Report</h2>
                {courses.some((course) => course.name || course.credits || course.grade) ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                            <thead className="text-xs uppercase bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Course Name</th>
                                    <th scope="col" className="px-6 py-3">Credits</th>
                                    <th scope="col" className="px-6 py-3">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
                                    <tr key={index} className="border-b border-gray-700">
                                        <td className="px-6 py-4">{course.name}</td>
                                        <td className="px-6 py-4">{course.credits}</td>
                                        <td className="px-6 py-4">{course.grade}</td>
                                    </tr>
                                ))}
                                {gpa !== null && (
                                    <tr className="bg-gray-700 font-semibold">
                                        <td className="px-6 py-4" colSpan="2">Calculated GPA</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-orange-500 text-xl text-white px-4 text-center rounded-sm "> {gpa} </span>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400">No courses added yet.</p>
                )}
                {/* Modal */}
                <ScaleModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveScale}
                    currentScale={gpaScale}
                />
            </div>
        </div>
    )
}

