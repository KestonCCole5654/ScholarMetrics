import React, { useState } from "react";
import axios from "axios";
import { Plus, Trash2 } from 'lucide-react';

export default function GPACalculator() {
    const [courses, setCourses] = useState([{ name: "", credits: 0, grade: "" }]);
    const [gpa, setGPA] = useState(null);
    const [error, setError] = useState(null);
    const [gpaScale, setGpaScale] = useState("4.0");
    const apiUrl = "https://studentmetrics-oh2tbodsp-keston-c-coles-projects.vercel.app"; // Replace with your production backend URL


    const addCourse = () => {
        setCourses([...courses, { name: "", credits: 0, grade: "" }]);
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

            // Use the apiUrl variable in the request
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
        <div className="min-h-screen text-white px-4 py-8 md:px-6 md:py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <h1 className="text-2xl md:text-3xl font-bold text-center">Grade Point Average Calculator</h1>

                {/* Error Handling */}
                {error && (
                    <div className="bg-red-500 text-white p-4 rounded">
                        <p>Error: {error}</p>
                    </div>
                )}



                {/* GPA Result */}
                {gpa !== null && (
                    <div className="p-6 bg-orange-500 rounded text-center">
                        <h2 className="text-xl md:text-2xl font-semibold">Your GPA</h2>
                        <p className="text-3xl md:text-4xl font-bold mt-2 text-white">{gpa}</p>
                    </div>
                )}

                {/* GPA Scale Input */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">GPA Scale</h2>
                    <p className="text-gray-400 mb-6 text-sm md:text-base">
                        Please select your college/university gpa scale for more accurate calculations
                    </p>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="gpaScale" className="text-sm text-gray-400">Select your GPA scale:</label>
                        <select
                            id="gpaScale"
                            value={gpaScale}
                            onChange={(e) => setGpaScale(e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                        >
                            <option value="4.0">4.0 scale</option>
                            <option value="4.3">4.3 scale</option>
                            <option value="5.0">5.0 scale</option>
                        </select>
                    </div>
                </div>



                {/* Course Form */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold">Enter Your Courses</h2>
                    <p className="text-gray-400 mb-6 text-sm md:text-base">
                        Add your courses, credits, and grades. Grades can be A, A-, B+, etc.
                    </p>

                    <div className="space-y-4">
                        {courses.map((course, index) => (
                            <div key={index} className="space-y-3 pb-4 border-b border-gray-700 last:border-0">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Course Name</label>
                                    <input
                                        type="text"
                                        value={course.name}
                                        onChange={(e) => updateCourse(index, "name", e.target.value)}
                                        placeholder="Enter course name"
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-sm text-gray-400">Credits</label>
                                        <input
                                            type="number"
                                            value={course.credits || ""}
                                            onChange={(e) => updateCourse(index, "credits", e.target.value)}
                                            placeholder="Credits"
                                            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="text-sm text-gray-400">Grade</label>
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

                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <button
                            onClick={addCourse}
                            className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 flex items-center justify-center"
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add Course
                        </button>
                        <button
                            onClick={calculateGPA}
                            className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 flex-1 md:flex-none"
                        >
                            Calculate GPA
                        </button>
                    </div>
                </div>


                {/* Course Summary */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Course Summary</h2>
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
                                            <td className="px-6 py-4 font-medium">{course.name || "Untitled Course"}</td>
                                            <td className="px-6 py-4">{course.credits || "N/A"}</td>
                                            <td className="px-6 py-4">{course.grade || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-4">No courses added yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}