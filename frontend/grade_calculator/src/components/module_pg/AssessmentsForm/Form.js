import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import axios from "axios";
import ScaleModal from "../../scale/scale";
import AssessmentReport from "../../Reports/moduleReport";

export default function AssessmentForm() {
    const [moduleName, setModuleName] = useState('');
    const [assessments, setAssessments] = useState([{ name: "", weight: 0, grade: "" }]);
    const [finalGrade, setFinalGrade] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gpaScale, setGpaScale] = useState(() => {
        const storedScale = sessionStorage.getItem('gpaScale');
        return storedScale ? JSON.parse(storedScale) : ['4.0', '4.3', '5.0'];
    });

    const handleSaveScale = (newScale) => {
        setGpaScale(newScale);
        setIsModalOpen(false);
    };

    const addAssessment = () => {
        setAssessments([...assessments, { name: "", weight: 0, grade: "" }]);
    };

    const updateAssessment = (index, field, value) => {
        const updatedAssessments = assessments.map((assessment, i) => {
            if (i === index) {
                return {
                    ...assessment,
                    [field]: field === "name" ? value : parseFloat(value) || 0
                };
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

        // Validate total weight
        const totalWeight = assessments.reduce((sum, assessment) => sum + assessment.weight, 0);
        if (totalWeight !== 100) {
            setError(`Total weight must be 100%. Current total: ${totalWeight}%`);
            return;
        }

        try {
            const requestData = {
                assessments: assessments.map(assessment => ({
                    name: assessment.name,
                    weight: assessment.weight
                })),
                weight: 100,
                grades: assessments.map(assessment => ({
                    grade: assessment.grade
                }))
            };

            const response = await axios.post('http://localhost:5000/api/moduleCalculation', requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;

            if (response.status === 200) {
                setFinalGrade(`${data.finalGrade.toFixed(2)}%`);
            } else {
                setError(data.error || "An error occurred while calculating the grade.");
            }
        } catch (error) {
            console.error("Calculation error:", error);
            setError(error.response?.data?.error || "Failed to connect to the server.");
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 space-y-6">
            <h2 className="text-xl md:text-2xl text-left font-semibold">Module Assessments</h2>
            <p className="text-gray-400 mb-6 text-left text-sm md:text-base">
                Add your assessments, their weights, and grades.
            </p>

            <div className="flex gap-3" >
                {/* New Module Name Input */}
                {/* Add a Feature to show the user the amount of credits they have entered so far. */}
                {/* Show Letter not only grade  */}
                {/* Show Reports, user will be able to view and load report details in the input fields if the want to edit the reports in the future */}
                <div className="space-y-2 text-left">
                    <label htmlFor="moduleName" className="text-sm text-gray-400 text-left">Module Name</label>
                    <input
                        id="moduleName"
                        type="text"
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                        placeholder="Enter module name"
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full text-white"
                    />
                </div>

                <div className="flex pt-6">
                    <button
                        className="text-gray-400 font-bold py-5 px-4 rounded hover:text-orange-500"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Edit Scale...
                    </button>
                </div>

            </div>
        

            {error && (
                <div className="bg-red-500 text-white p-4 rounded">
                    <p>Error: {error}</p>
                </div>
            )}

            <div className="space-y-4">
                {assessments.map((assessment, index) => (
                    <div key={index} className="space-y-3 pb-4 border-b text-left border-gray-700 last:border-0">
                        <div className="flex gap-3">
                            <div className="flex-1 space-y-2">
                                <label htmlFor={`assessmentName${index}`} className="text-sm text-gray-400">Assessment Name</label>
                                <input
                                    id={`assessmentName${index}`}
                                    type="text"
                                    value={assessment.name}
                                    onChange={(e) => updateAssessment(index, "name", e.target.value)}
                                    placeholder="Enter assessment name"
                                    className="bg-gray-700 border flex border-gray-600 rounded px-3 py-2 w-full text-white"
                                />
                            </div>

                           
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

            {finalGrade !== null && (
                <AssessmentReport
                    moduleName={moduleName}
                    assessments={assessments}
                    finalGrade={finalGrade}
                    error={error}
                />
            )}

            {isModalOpen && <ScaleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveScale} />}
        </div>
    );
}