import React, { useState } from "react";
import { Trash2,Plus } from "lucide-react";

export default function AssessmentForm({ assessments, setAssessments, finalGrade, setFinalGrade }) {
    const [error, setError] = useState(null);

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

    const calculateGrade = async () => {
        setError(null);
        setFinalGrade(null);

        try {
            const response = await fetch('http://localhost:5000/calculate-grade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ assessments }),
            });

            const data = await response.json();

            if (response.ok) {
                setFinalGrade(`${data.final_grade}%`); // Add the percentage symbol here
            } else {
                setError(data.error || "An error occurred while calculating the grade.");
            }
        } catch (error) {
            setError("Failed to connect to the server.");
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold">Module Assessments</h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
                Add your assessments, their weights, and grades.
            </p>

            {error && (
                <div className="bg-red-500 text-white p-4 rounded">
                    <p>Error: {error}</p>
                </div>
            )}

            <div className="space-y-4">
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
                    onClick={calculateGrade}
                    className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 flex-1 md:flex-none"
                >
                    Calculate Grade
                </button>
            </div>


            {/* Assessment Summary */}
            <div className="bg-gray-800 rounded-lg p-2 md:p-6">
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
                                {finalGrade !== null && (
                                    <tr className="bg-gray-700 font-semibold">
                                        <td className="px-6 py-4" colSpan="2">Calculated GPA</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-orange-500 text-xl text-white px-4 text-center rounded-sm "> {finalGrade} </span>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-4">No assessments added yet.</div>
                )}
            </div>



        </div>
    );
}
