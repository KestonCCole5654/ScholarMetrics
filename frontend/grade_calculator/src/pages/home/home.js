import React, { useState } from "react";
import { Plus, Trash2, Upload } from 'lucide-react';
import axios from 'axios';


export default function ModuleGradeCalculator() {
    // State management
    const [moduleName, setModuleName] = useState("");
    const [assessments, setAssessments] = useState([
        { name: "", weight: 0, grade: 0 }
    ]);
    const [finalGrade, setFinalGrade] = useState(null);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);

    // Add a new assessment row
    const addAssessment = () => {
        setAssessments([...assessments, { name: "", weight: 0, grade: 0 }]);
    };

    // Update assessment details
    const updateAssessment = (index, field, value) => {
        const updatedAssessments = [...assessments];
        updatedAssessments[index] = {
            ...updatedAssessments[index],
            [field]: field === "name" ? value : parseFloat(value) || 0
        };
        setAssessments(updatedAssessments);
    };

    // Remove an assessment row
    const removeAssessment = (index) => {
        setAssessments(assessments.filter((_, i) => i !== index));
    };

    // Calculate grade
    const calculateGrade = async () => {
        // Validate inputs
        const totalWeight = assessments.reduce((sum, a) => sum + a.weight, 0);
        if (totalWeight !== 100) {
            setError("Total weight must equal 100%");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/calculate-grade', 
                { 
                    grades: assessments,
                    moduleName 
                }
            );
            setFinalGrade(response.data.finalGrade);
            setError(null);
        } catch (err) {
            setError("Failed to calculate grade. Please check your inputs.");
            console.error(err);
        }
    };

    // File upload handler
    const handleFileUpload = async (event) => {
        const uploadedFile = event.target.files[0];
        if (!uploadedFile) return;

        const formData = new FormData();
        formData.append('file', uploadedFile);

        try {
            const response = await axios.post(
                'http://localhost:5000/upload-syllabus', 
                formData, 
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            // Update assessments from uploaded file
            if (response.data.grades) {
                setAssessments(response.data.grades);
                setFile(uploadedFile);
            }
        } catch (err) {
            setError("File upload failed");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 py-8 md:px-6 md:py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center text-orange-500">
                    Module Grade Calculator
                </h1>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-600 text-white p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Grade Result */}
                {finalGrade !== null && (
                    <div className="bg-orange-500 text-white p-6 rounded-lg text-center">
                        <h2 className="text-xl font-semibold">{moduleName || "Module Grade"}</h2>
                        <p className="text-4xl font-bold mt-2">{finalGrade.toFixed(2)}%</p>
                    </div>
                )}

                {/* File Upload */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Upload Syllabus</h2>
                    <input 
                        type="file" 
                        accept=".csv,.txt" 
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-300 
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-orange-500 file:text-white
                            hover:file:bg-orange-600"
                    />
                    {file && (
                        <p className="mt-2 text-sm text-gray-400">
                            Uploaded: {file.name}
                        </p>
                    )}
                </div>

                {/* Assessment Form */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                        Enter Module Details
                    </h2>

                    {/* Module Name Input */}
                    <input 
                        type="text"
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                        placeholder="Module Name"
                        className="w-full p-2 mb-4 bg-gray-700 rounded"
                    />

                    {/* Assessments Inputs */}
                    {assessments.map((assessment, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input 
                                type="text"
                                placeholder="Assessment Name"
                                value={assessment.name}
                                onChange={(e) => updateAssessment(index, "name", e.target.value)}
                                className="flex-1 p-2 bg-gray-700 rounded"
                            />
                            <input 
                                type="number"
                                placeholder="Weight %"
                                value={assessment.weight}
                                onChange={(e) => updateAssessment(index, "weight", e.target.value)}
                                className="w-24 p-2 bg-gray-700 rounded"
                            />
                            <input 
                                type="number"
                                placeholder="Grade %"
                                value={assessment.grade}
                                onChange={(e) => updateAssessment(index, "grade", e.target.value)}
                                className="w-24 p-2 bg-gray-700 rounded"
                            />
                            <button 
                                onClick={() => removeAssessment(index)}
                                className="bg-red-500 p-2 rounded"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                        <button 
                            onClick={addAssessment}
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center"
                        >
                            <Plus className="mr-2" /> Add Assessment
                        </button>
                        <button 
                            onClick={calculateGrade}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Calculate Grade
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}