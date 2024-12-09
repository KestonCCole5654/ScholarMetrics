import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import UploadSection from '../module_pg/UploadSection/uploadsection';
import ScaleModal from '../scale/scale';
import GpaReport from '../Reports/gpaReport';

export default function GPACalculatorComponent() {
    const [courses, setCourses] = useState([{ name: "", credits: 0, grade: "" }]);
    const [gpa, setGPA] = useState(null);
    const [error, setError] = useState(null);
    const [gpaScale, setGpaScale] = useState(() => {
        // Load GPA scale from sessionStorage or default to ['4.0', '4.3', '5.0']
        const storedScale = sessionStorage.getItem('gpaScale');
        return storedScale ? JSON.parse(storedScale) : ['4.0', '4.3', '5.0'];
    });
    const [academicYear, setAcademicYear] = useState(""); 
    const [semester, setSemester] = useState(""); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const apiUrl = "http://localhost:5000/"; // Adjust this for production
    const [totalCredits, setTotalCredits] = useState(0); // Total credits for all courses

    // Effect to save GPA scale to sessionStorage whenever it changes
    useEffect(() => {
        sessionStorage.setItem('gpaScale', JSON.stringify(gpaScale));
    }, [gpaScale]);

    const addCourse = () => {
        setCourses([...courses, { name: "", credits: 0, grade: "" }]);
    };

    const handleSaveScale = (newScale) => {
        setGpaScale(newScale); // Update the scale state
        setIsModalOpen(false);  // Close the modal after saving
    };

    const handleGpaScaleChange = (e) => {
        const selectedValue = e.target.value;
        setGpaScale([selectedValue]); // Set the scale from the dropdown
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
    
            const selectedScale = Array.isArray(gpaScale) ? gpaScale[0] : gpaScale;
    
            const response = await axios.post(`${apiUrl}/api/gpaCalculation`, {
                grades,
                scale: selectedScale,
                year: academicYear,
                semester,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            console.log("GPA Calculation Response:", response.data); // Debugging
            setGPA(response.data.gpa); // Update GPA in state
            setError(null);
        } catch (err) {
            console.error("API Error:", err.response || err.message); // Debugging
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div>
            <div>
                <UploadSection />
            </div>
            <div>or</div>

            {error && (
                <div className="bg-red-500 text-white p-4 rounded">
                    <p>Error: {error}</p>
                </div>
            )}

            <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                <h2 className="text-xl md:text-1xl font-semibold text-left mb-5">Enter Your Modules</h2>
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex-grow">
                        <label className="block text-gray-400 mb-2 text-left">GPA Scale</label>
                        <select
                            value={gpaScale[0]} // Always gets the first value of the array
                            onChange={handleGpaScaleChange}
                            className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                        >
                            {['4.0', '4.3', '5.0'].map((scale, index) => (
                                <option key={index} value={scale}>
                                    {scale}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row pt-6">
                        <button
                            className="text-gray-400 font-bold py-5 px-4 rounded hover:text-orange-500"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Edit Scale...
                        </button>
                    </div>
                </div>
                <div className='flex flex-row gap-5'>
                    <div className="flex-grow mt-5 mb-5">
                        <label className="block text-gray-400 mb-2 text-left">Academic Year</label>
                        <input
                            value={academicYear}
                            onChange={(e) => setAcademicYear(e.target.value)}
                            placeholder="eg. 2024/25"
                            className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                        />
                    </div>

                    <div className="flex-grow mt-5 mb-5">
                        <label className="block text-gray-400 mb-2 text-left">Semester</label>
                        <input
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            placeholder="eg. 1"
                            className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {courses.map((course, index) => (
                        <div key={index} className="space-y-3 pb-4 border-b border-gray-700 last:border-0">
                            <div className="space-y-2">
                                <label className="block text-gray-400 text-left">Course Name</label>
                                <input
                                    type="text"
                                    value={course.name}
                                    onChange={(e) => updateCourse(index, "name", e.target.value)}
                                    placeholder="Enter course name"
                                    className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                />
                            </div>

                            <div className="flex gap-4 py-4">
                                <div className="flex-1 space-y-2">
                                    <label className="text-gray-400 block text-left">Credits</label>
                                    <input
                                        type="number"
                                        value={course.credits || ""}
                                        onChange={(e) => updateCourse(index, "credits", e.target.value)}
                                        placeholder="Credits"
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-gray-400 block text-left">Grade</label>
                                    <input
                                        type="text"
                                        value={course.grade || ""}
                                        onChange={(e) => {
                                            const value = e.target.value.toUpperCase();
                                            if (value.length <= 2) {
                                                updateCourse(index, "grade", value);
                                            }
                                        }}
                                        placeholder="A, A+, B- etc"
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
                        className="flex items-center justify-center bg-orange-500 text-black  py-2 px-4 rounded hover:bg-orange-600"
                    >
                        <Plus size={16} className="mr-2" /> Add Course
                    </button>
                    <button
                        onClick={calculateGPA}
                        className="bg-orange-500 text-black  py-2 px-4 rounded hover:bg-orange-600"
                    >
                        Calculate GPA
                    </button>
                </div>
            </div>

            {gpa !== null && (
                <div className="mt-6">
                    <GpaReport
                        courses={courses}
                        gpa={gpa}
                        totalCredits={totalCredits}
                    />
                </div>
            )}



            {isModalOpen && <ScaleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveScale} />}
        </div>
    );
}
