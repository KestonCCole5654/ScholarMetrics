import React, { useState, useCallback } from "react";
import { Plus, Trash2, Upload } from 'lucide-react';
import { useDropzone } from "react-dropzone";

export default function ModuleGradeCalculator() {
    const [assessments, setAssessments] = useState([{ name: "", weight: 0, grade: "" }]);
    const [finalGrade, setFinalGrade] = useState(null);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [moduleName, setModuleName] = useState("");
    const [gpaScale, setGpaScale] = useState(4.0);
  


    const addAssessment = () => {
        setAssessments([...assessments, { name: "", weight: 0, grade: "" }]);
    };

    const updateAssessment = (index, field, value) => {
        const updatedAssessments = assessments.map((assessment, i) => {
            if (i === index) {
                return { ...assessment, [field]: field === "name" ? value : parseFloat(value) || 0 };
            }
            return assessment;
        });
        setAssessments(updatedAssessments);
    };

    const removeAssessment = (index) => {
        setAssessments(assessments.filter((_, i) => i !== index));
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setFile(file);
            setIsUploading(true);
            setError(null);
            setUploadSuccess(false);

            // Simulating file upload process
            setTimeout(() => {
                setIsUploading(false);
                setUploadSuccess(true);
            }, 2000);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
            "text/plain": [".txt"],
        },
        multiple: false,
    });

    return (
        <div className="min-h-screen text-white px-4 py-8 md:px-6 md:py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <h1 className="text-2xl md:text-3xl font-bold text-center">Module Grade Calculator</h1>

                {/* Error Handling */}
                {error && (
                    <div className="bg-red-500 text-white p-4 rounded">
                        <p>Error: {error}</p>
                    </div>
                )}

                {/* Grade Result */}
                {finalGrade !== null && (
                    <div className="p-6 bg-orange-500 rounded text-center">
                        <h2 className="text-xl md:text-2xl font-semibold">{moduleName || "Module Grade"}</h2>
                        <p className="text-3xl md:text-4xl font-bold mt-2 text-white">{finalGrade}%</p>
                    </div>
                )}

                {/* Upload Section */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Upload Course Outline</h2>
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 ${isDragActive ? "border-orange-500 bg-orange-500/10" : "border-gray-600"
                            } transition-colors duration-200 cursor-pointer hover:border-orange-500 hover:bg-orange-500/5`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center text-center space-y-4">
                            <Upload
                                className={`w-8 h-8 ${isDragActive ? "text-orange-500" : "text-gray-400"
                                    }`}
                            />
                            <div className="space-y-1">
                                <p className="text-gray-300">
                                    Drag & Drop or{" "}
                                    <span className="text-orange-500 hover:text-orange-400">
                                        Choose file
                                    </span>{" "}
                                    to upload
                                </p>
                                <p className="text-sm text-gray-500">CSV or TXT</p>
                                <p className="text-sm text-white bg-orange-500">FEATURE COMING SOON !!</p>
                            </div>
                            {file && <div className="text-sm text-gray-400">Selected: {file.name}</div>}
                            {isUploading && <div className="text-sm text-orange-500">Uploading...</div>}
                            {uploadSuccess && (
                                <div className="text-sm text-green-500">File uploaded successfully!</div>
                            )}
                        </div>
                    </div>
                </div>

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

                {/* Assessment Form */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold">Enter Module Name and Assessments</h2>
                    <p className="text-gray-400 mb-6 text-sm md:text-base">
                        Add your module name, assessments, their weights, and your grades.
                    </p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="moduleName" className="text-sm text-gray-400">Module Name</label>
                            <input
                                id="moduleName"
                                type="text"
                                value={moduleName}
                                onChange={(e) => setModuleName(e.target.value)}
                                placeholder="Enter module name"
                                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                            />
                        </div>

                        {assessments.map((assessment, index) => (
                            <div key={index} className="space-y-3 pb-4 border-b border-gray-700 last:border-0">
                                <div className="space-y-2">
                                    <label htmlFor={`assessmentName${index}`} className="text-sm text-gray-400">Assessment Name</label>
                                    <input
                                        id={`assessmentName${index}`}
                                        type="text"
                                        value={assessment.name}
                                        onChange={(e) => updateAssessment(index, "name", e.target.value)}
                                        placeholder="Enter assessment name"
                                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1 space-y-2">
                                        <label htmlFor={`assessmentWeight${index}`} className="text-sm text-gray-400">Weight (%)</label>
                                        <input
                                            id={`assessmentWeight${index}`}
                                            type="number"
                                            value={assessment.weight || ""}
                                            onChange={(e) => updateAssessment(index, "weight", e.target.value)}
                                            placeholder="Weight"
                                            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label htmlFor={`assessmentGrade${index}`} className="text-sm text-gray-400">Grade (%)</label>
                                        <input
                                            id={`assessmentGrade${index}`}
                                            type="number"
                                            value={assessment.grade || ""}
                                            onChange={(e) => updateAssessment(index, "grade", e.target.value)}
                                            placeholder="Grade"
                                            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeAssessment(index)}
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
                            onClick={addAssessment}
                            className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 flex items-center justify-center"
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add Assessment
                        </button>
                        <button
                            className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 flex-1 md:flex-none"
                        >
                            Calculate Grade
                        </button>
                    </div>
                </div>

                {/* Assessment Summary */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Assessment Summary</h2>
                    {assessments.some((assessment) => assessment.name || assessment.weight || assessment.grade) ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-300">
                                <thead className="text-xs uppercase bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Assessment Name</th>
                                        <th scope="col" className="px-6 py-3">Weight (%)</th>
                                        <th scope="col" className="px-6 py-3">Grade (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assessments.map((assessment, index) => (
                                        <tr key={index} className="border-b border-gray-700">
                                            <td className="px-6 py-4 font-medium">{assessment.name || "Untitled Assessment"}</td>
                                            <td className="px-6 py-4">{assessment.weight || "N/A"}%</td>
                                            <td className="px-6 py-4">{assessment.grade || "N/A"}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-4">No assessments added yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}