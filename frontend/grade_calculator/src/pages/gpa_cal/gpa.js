import React, { useState } from "react";
import axios from "axios";
import { Plus, Trash2 } from 'lucide-react';
import GPAImprovementPlanAPI from "../../components/GPAImprovementPlanAPI/plan1";


export default function GPACalculator() {
    const [courses, setCourses] = useState([{ name: "", credits: 0, grade: "" }]);
    const [gpa, setGPA] = useState(null);
    const [error, setError] = useState(null);
    const [gpaScale, setGpaScale] = useState("4.0");
    const apiUrl = "http://localhost:5000"; // Adjust this for production


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
            


                <h1 className="text-2xl md:text-3xl font-bold text-center">Grade Point Average Calculator</h1>
                {error && (
                    <div className="bg-red-500 text-white p-4 rounded">
                        <p>Error: {error}</p>
                    </div>
                )}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">GPA Scale</h2>
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
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold">Enter Your Courses</h2>
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


                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Results Summary</h2>
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
                </div>
            


                <div className="max-w-4xl mx-auto space-y-6">

                    {/****
                     * 
                     *  <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                        <h2 className="text-xl md:text-2xl font-semibold mb-4">Grade Predictions - "What If" Feature</h2>
                        <div className="space-y-6">

                            <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                                <h2 className="text-xl md:text-2xl font-semibold mb-4">GPA Scale</h2>
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="currentGPA" className="block text-sm font-medium text-gray-400">Current GPA</label>
                                    <input
                                        id="currentGPA"
                                        type="number"
                                        value={currentGPA}
                                        onChange={(e) => setCurrentGPA(e.target.value)}
                                        placeholder="Enter your current GPA"
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="semester" className="block text-sm font-medium text-gray-400">Semester</label>
                                    <input
                                        id="semester"
                                        type="text"
                                        value={semester}
                                        onChange={(e) => setSemester(e.target.value)}
                                        placeholder="e.g., Fall 2023"
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="academicYear" className="block text-sm font-medium text-gray-400">Academic Year</label>
                                    <input
                                        id="academicYear"
                                        type="text"
                                        value={academicYear}
                                        onChange={(e) => setAcademicYear(e.target.value)}
                                        placeholder="e.g., 2023-2024"
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="aimedGPA" className="block text-sm font-medium text-gray-400">Aimed GPA</label>
                                    <input
                                        id="aimedGPA"
                                        type="number"
                                        value={aimedGPA}
                                        onChange={(e) => setAimedGPA(e.target.value)}
                                        placeholder="Enter your aimed GPA"
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Current Grades</h3>
                                <table className="w-full text-sm text-left text-gray-300">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3">Course</th>
                                            <th className="px-6 py-3 text-center">Credits</th>
                                            <th className="px-6 py-3 text-center">Grade</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentGrades.map((grade, index) => (
                                            <tr key={index} className="border-b border-gray-700">
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        value={grade.course}
                                                        onChange={(e) => updateCurrentGrade(index, "course", e.target.value)}
                                                        placeholder="Course name"
                                                        className="bg-gray-700 border-gray-600 rounded px-3 py-2 w-full text-white"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="number"
                                                        value={grade.credits}
                                                        onChange={(e) => updateCurrentGrade(index, "credits", e.target.value)}
                                                        placeholder="Credits"
                                                        className="bg-gray-700 border-gray-600 rounded px-3 py-2 w-20 mx-auto text-white text-center"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="text"
                                                        value={grade.grade}
                                                        onChange={(e) => updateCurrentGrade(index, "grade", e.target.value.toUpperCase())}
                                                        placeholder="Grade"
                                                        className="bg-gray-700 border-gray-600 rounded px-3 py-2 w-20 mx-auto text-white text-center"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => removeCurrentGrade(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button
                                    onClick={addCurrentGrade}
                                    className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 mt-2 flex items-center"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add Current Grade
                                </button>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Target Grades</h3>
                                <table className="w-full text-sm text-left text-gray-300">
                                    <thead className="text-xs uppercase bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3">Course</th>
                                            <th className="px-6 py-3 text-center">Credits</th>
                                            <th className="px-6 py-3 text-center">Grade</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {targetGrades.map((grade, index) => (
                                            <tr key={index} className="border-b border-gray-700">
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        value={grade.course}
                                                        onChange={(e) => updateTargetGrade(index, "course", e.target.value)}
                                                        placeholder="Course name"
                                                        className="bg-gray-700 border-gray-600 rounded px-3 py-2 w-full text-white"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="number"
                                                        value={grade.credits}
                                                        onChange={(e) => updateTargetGrade(index, "credits", e.target.value)}
                                                        placeholder="Credits"
                                                        className="bg-gray-700 border-gray-600 rounded px-3 py-2 w-20 mx-auto text-white text-center"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="text"
                                                        value={grade.grade}
                                                        onChange={(e) => updateTargetGrade(index, "grade", e.target.value.toUpperCase())}
                                                        placeholder="Grade"
                                                        className="bg-gray-700 border-gray-600 rounded px-3 py-2 w-20 mx-auto text-white text-center"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => removeTargetGrade(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button
                                    onClick={addTargetGrade}
                                    className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 mt-2 flex items-center"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add Target Grade
                                </button>
                            </div>

                            <button
                                onClick={calculatePredictedGPA}
                                className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 w-full"
                            >
                                Predicted GPA Grades
                            </button>

                            {predictedGPA !== null && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Predicted GPA</h3>
                                    <span className="bg-orange-500 text-xl text-white px-4 py-2 rounded-sm inline-block mt-2">
                                        {predictedGPA}
                                    </span>
                                </div>
                            )}
                        </div>

                    </div>
                     * 
                    */}
                    {/* New "What If" Feature Section */}
                   
                </div>



                <GPAImprovementPlanAPI/>
                

            </div>
        </div>
    );
}
