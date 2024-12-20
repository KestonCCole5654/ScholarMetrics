import React, { useState, useEffect } from 'react';
import { XIcon, ChevronDownIcon, PlusIcon, X, Edit2Icon, ArrowRight } from 'lucide-react';
import { Tabs } from "../../UI/tabs/tabs";
import { Hero } from '../../UI/hero/hero';
import { GPAScaleTable } from '../../UI/gpaScale/table';

const GradeCalculatorComponent = () => {
    const [copied, setCopied] = useState(false);

    const handleShareClick = () => {
        const currentUrl = window.location.href;

        navigator.clipboard.writeText(currentUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const [assignments, setAssignments] = useState([
        {
            id: 1,
            name: '',
            weight: '',
            score: '',
            totalPoints: ''
        }
    ]);

    const [finalGrade, setFinalGrade] = useState('0.00');
    const [weightTotal, setWeightTotal] = useState(0);

    // GPA Scale State
    const [editingScale, setEditingScale] = useState(null);
    const [gpaScale, setGpaScale] = useState([
        { grade: 'A+', points: 4.0, range: { min: 97, max: 100 } },
        { grade: 'A', points: 4.0, range: { min: 93, max: 96 } },
        { grade: 'A-', points: 3.7, range: { min: 90, max: 92 } },
        { grade: 'B+', points: 3.3, range: { min: 87, max: 89 } },
        { grade: 'B', points: 3.0, range: { min: 83, max: 86 } },
        { grade: 'B-', points: 2.7, range: { min: 80, max: 82 } },
        { grade: 'C+', points: 2.3, range: { min: 77, max: 79 } },
        { grade: 'C', points: 2.0, range: { min: 73, max: 76 } },
        { grade: 'C-', points: 1.7, range: { min: 70, max: 72 } },
        { grade: 'D+', points: 1.3, range: { min: 67, max: 69 } },
        { grade: 'D', points: 1.0, range: { min: 63, max: 66 } },
        { grade: 'F', points: 0.0, range: { min: 0, max: 62 } },
    ]);

    // Update GPA Scale
    const updateGpaScale = (index, field, value) => {
        const updatedScale = [...gpaScale];

        // Handle nested range updates
        if (field === 'min' || field === 'max') {
            updatedScale[index] = {
                ...updatedScale[index],
                range: {
                    ...updatedScale[index].range,
                    [field]: value
                }
            };
        } else {
            // For grade or points
            updatedScale[index] = {
                ...updatedScale[index],
                [field]: value
            };
        }

        setGpaScale(updatedScale);
    };

    // Add a new assignment
    const addAssignment = () => {
        setAssignments(prev => [...prev, {
            id: prev.length + 1,
            name: '',
            weight: '',
            grade: ''
        }]);
    };

    // Remove an assignment
    const removeAssignment = (assignmentId) => {
        setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
    };

    // Update assignment details
    const updateAssignment = (assignmentId, field, value) => {
        setAssignments(prev => prev.map(assignment =>
            assignment.id === assignmentId
                ? { ...assignment, [field]: value }
                : assignment
        ));
    };

    // Calculate final grade
    useEffect(() => {
        // Calculate total weighted score and weight
        let totalWeightedScore = 0;
        let currentWeightTotal = 0;

        assignments.forEach(assignment => {
            const weight = parseFloat(assignment.weight) || 0;
            const grade = parseFloat(assignment.grade) || 0;

            if (weight > 0) {
                totalWeightedScore += (grade * (weight / 100));
                currentWeightTotal += weight;
            }
        });

        // Set final grade and weight total
        setFinalGrade(totalWeightedScore.toFixed(2));
        setWeightTotal(currentWeightTotal);
    }, [assignments]);




    return (
        <div className="max-w-6xl mx-auto pt-6 pr-3 pl-3 font-custom bg-blue-50 rounded-lg">
            <Hero />
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">

                <div className="flex-grow font-custom">
                    <div>
                        <h1 className='text-2xl font-semibold text-gray-800 text-left mb-5 mt-5'>Grade Calculator</h1>
                    </div>
                    <div className="relative font-custom">
                        <table className="w-full border-b">
                            <thead>
                                <tr className="text-left text-gray-600">
                                    <th className="pb-2 font-semibold">Assignment Name</th>
                                    <th className="pb-2 font-semibold">Grade (%)</th>
                                    <th className="pb-2 font-semibold">Weight (%)</th>
                                    <th className="pb-2 w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map((assignment) => (
                                    <tr key={assignment.id} className="border last:border-b-0">
                                        <td className="py-2 pr-2">
                                            <input
                                                type="text"
                                                value={assignment.name}
                                                onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                                                placeholder="Assignment name"
                                                className="w-full p-2 bg-inherit outline-none"
                                            />
                                        </td>
                                        <td className="py-2 border pr-2">
                                            <input
                                                type="number"
                                                value={assignment.grade}
                                                onChange={(e) => updateAssignment(assignment.id, 'grade', e.target.value)}
                                                placeholder="Grade (%)"
                                                className="w-full p-2 rounded outline-none bg-inherit"
                                                min="0"
                                                max="100"
                                            />
                                        </td>
                                        <td className="py-2 pr-2">
                                            <input
                                                type="number"
                                                value={assignment.weight}
                                                onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                                                placeholder="Weight (%)"
                                                className="w-full p-2 rounded outline-none bg-inherit"
                                                min="0"
                                                max="100"
                                            />
                                        </td>
                                        <td className="py-2">
                                            <button
                                                onClick={() => removeAssignment(assignment.id)}
                                                className="p-1"
                                            >
                                                <XIcon className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Final Grade and Weight Total */}
                        <div className="mt-4 text-center">
                            <div className="mb-2 p-5">
                                <span className="text-gray-600 font-semibold mr-2">Total Weight: </span>
                                <span className={`font-bold text-xl ${weightTotal > 100 ? 'text-red-600' : 'text-green-600'}`}>
                                    {weightTotal.toFixed(2)}%
                                </span>
                            </div>
                            <div className='border shadow-sm bg-green-100 p-5'>
                                <span className="text-gray-600 font-semibold">Final Grade: </span>
                                <span className="text-2xl text-green-600 font-bold">
                                    {finalGrade}%
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={addAssignment}
                            className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <div className="flex items-center">
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Add Assignment
                            </div>
                        </button>
                    </div>
                </div>

                {/* GPA Scale Table */}
                <div className="w-full md:w-auto md:flex-none">
                    <GPAScaleTable />
                </div>
                
            </div>
            <Tabs />


            <div className='flex flex-col mt-11 text-left font-custom '>
                <h1 className="text-3xl font-custom font-bold  pt-5 text-left text-gray-800 mb-4">
                    How to Use Calculator?
                    <br />
                    <span className='mt-11 font-custom font-semibold text-center text-sm'>Step-by-Step Instructions</span>
                    <div className='border-b mt-6 border-x-cyan-700'></div>
                </h1>
                <p className="text-gray-600 font-custom mb-8">
                    Calculate your exact GPA using our free online GPA Calculator. Get your GPA instantly by entering the earned grade and credits for each course.
                </p>
            </div>

        </div>
    );
};

export default GradeCalculatorComponent;