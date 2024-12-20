import React, { useState } from 'react';
import { Calculator, PlusIcon, XIcon, ArrowRight, Edit2Icon } from 'lucide-react';
import { Tabs } from "../../UI/tabs/tabs";


const GPAImprovementCalculator = () => {
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

    // New state for GPA scale editing
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


    const [currentGPA, setCurrentGPA] = useState('');
    const [targetGPA, setTargetGPA] = useState('');
    const [currentCredits, setCurrentCredits] = useState('');
    const [semesters, setSemesters] = useState([
        {
            id: 1,
            name: 'Upcoming Semester',
            courses: [
                {
                    id: Date.now(),
                    name: '',
                    grade: '',
                    credits: '',
                    requiredGrade: null
                }
            ]
        }
    ]);
    const [cumulativeResult, setCumulativeResult] = useState(null);

    const addSemester = () => {
        setSemesters([
            ...semesters,
            {
                id: Date.now(),
                name: `Semester ${semesters.length + 1}`,
                courses: [{
                    id: Date.now(),
                    name: '',
                    grade: '',
                    credits: '',
                    requiredGrade: null
                }]
            }
        ]);
    };

    const removeSemester = (semesterId) => {
        if (semesters.length > 1) {
            setSemesters(semesters.filter(semester => semester.id !== semesterId));
        }
    };

    const addCourse = (semesterId) => {
        setSemesters(semesters.map(semester =>
            semester.id === semesterId
                ? {
                    ...semester, courses: [...semester.courses, {
                        id: Date.now(),
                        name: '',
                        grade: '',
                        credits: '',
                        requiredGrade: null
                    }]
                }
                : semester
        ));
    };

    const removeCourse = (semesterId, courseId) => {
        setSemesters(semesters.map(semester =>
            semester.id === semesterId
                ? { ...semester, courses: semester.courses.filter(course => course.id !== courseId) }
                : semester
        ));
    };

    const updateCourse = (semesterId, courseId, field, value) => {
        setSemesters(semesters.map(semester =>
            semester.id === semesterId
                ? {
                    ...semester, courses: semester.courses.map(course =>
                        course.id === courseId
                            ? { ...course, [field]: value }
                            : course
                    )
                }
                : semester
        ));
    };

    const calculateRequiredGPA = () => {
        // Convert inputs to numbers
        const currentGPANum = parseFloat(currentGPA);
        const targetGPANum = parseFloat(targetGPA);
        const currentCreditsNum = parseFloat(currentCredits);

        // Validate inputs
        if (isNaN(currentGPANum) || isNaN(targetGPANum) || isNaN(currentCreditsNum)) {
            alert('Please enter valid numbers for current GPA, target GPA, and current credits');
            return;
        }

        // Calculate total additional credits
        const additionalCreditsTotal = semesters.reduce((total, semester) =>
            total + semester.courses.reduce((semTotal, course) =>
                semTotal + (parseFloat(course.credits) || 0), 0
            ), 0
        );

        // Calculate required total points
        const currentTotalPoints = currentGPANum * currentCreditsNum;
        const targetTotalPoints = targetGPANum * (currentCreditsNum + additionalCreditsTotal);

        // Calculate required GPA for additional credits
        const requiredGPA = (targetTotalPoints - currentTotalPoints) / additionalCreditsTotal;
        const roundedRequiredGPA = Math.floor(requiredGPA * 10) / 10;

        // Update each semester's courses with required grade
        const updatedSemesters = semesters.map(semester => ({
            ...semester,
            courses: semester.courses.map(course => ({
                ...course,
                requiredGrade: roundedRequiredGPA.toFixed(1)
            }))
        }));

        setSemesters(updatedSemesters);
        setCumulativeResult({
            requiredGPA: roundedRequiredGPA.toFixed(1),
            additionalCredits: additionalCreditsTotal
        });
    };

    return (
        <div className="max-w-6xl font-custom mx-auto p-6 bg-blue-50 ">

            <div className='flex items-left bg-blue-100 font-custom p-5 shadow-sm mb-5 rounded-lg'>
                <div className='flex-grow text-left pr-6'>
                    <h1 className="text-2xl font-bold text-left text-gray-800 mb-4">
                        College/University GPA Calculator
                    </h1>
                    <p className="text-gray-600 text-left mb-4">
                        Calculate your exact GPA using our free online GPA Calculator. Get your GPA instantly by entering the earned grade and credits for each course.
                    </p>

                    <button
                        onClick={handleShareClick}
                        className='bg-blue-200 hover:bg-blue-300 mr-5 text-blue-800 px-4 py-2  rounded-md text-sm'
                    >
                        {copied ? 'Copied!' : 'Share URL'}
                    </button>



                </div>

                <div className='w-1/4'>
                    <img
                        src="/images/image1.jpg"
                        alt="GPA Calculator"
                        className='w-full h-auto rounded-lg'
                    />
                </div>
            </div>

            
            <Tabs/>


            {/* Initial GPA Information */}
            <div className="grid grid-cols-3 gap-4 mb-6 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label className="block text-gray-700 mb-2">Current GPA</label>
                    <input
                        type="number"
                        step="0.01"
                        value={currentGPA}
                        onChange={(e) => setCurrentGPA(e.target.value)}
                        placeholder="e.g. 2.8"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Target GPA</label>
                    <input
                        type="number"
                        step="0.01"
                        value={targetGPA}
                        onChange={(e) => setTargetGPA(e.target.value)}
                        placeholder="e.g. 3.0"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Current Credits</label>
                    <input
                        type="number"
                        value={currentCredits}
                        onChange={(e) => setCurrentCredits(e.target.value)}
                        placeholder="e.g. 25"
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            <div className='flex space-x-6' >

                {/* Semesters Section */}
                <div className="flex-grow font-custom">
                    {semesters.map((semester) => (
                        <div key={semester.id} className="mb-8 relative">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">{semester.name}</h2>
                                {semesters.length > 1 && (
                                    <div className="absolute top-0 right-0">
                                        <button
                                            onClick={() => removeSemester(semester.id)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Remove Semester"
                                        >
                                            <XIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="relative font-custom">
                                <table className="w-full border-b">
                                    <thead>
                                        <tr className="text-left text-gray-600">
                                            <th className="pb-2 font-semibold">Course Name</th>
                                            <th className="pb-2 font-semibold">Expected Grade</th>
                                            <th className="pb-2 font-semibold">Credits</th>
                                            <th className="pb-2 font-semibold">Required Grade</th>
                                            <th className="pb-2 w-10"></th>
                                        </tr>
                                    </thead>



                                    <tbody>
                                        {semester.courses.map((course) => (
                                            <tr key={course.id} className="border last:border-b-0">
                                                <td className="py-2 pr-2">
                                                    <input
                                                        type="text"
                                                        value={course.name}
                                                        onChange={(e) => updateCourse(semester.id, course.id, 'name', e.target.value)}
                                                        placeholder="Course name"
                                                        className="w-full p-2 bg-inherit outline-none"
                                                    />
                                                </td>
                                                <td className="py-2 border pr-2">
                                                    <div className="relative">
                                                        <select
                                                            value={course.grade || ""}
                                                            onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                                                            className="w-full p-2 rounded outline-none appearance-none bg-inherit"
                                                        >
                                                            <option value=""> -- </option>
                                                            <option value="A+">A+</option>
                                                            <option value="A">A</option>
                                                            <option value="A-">A-</option>
                                                            <option value="B+">B+</option>
                                                            <option value="B">B</option>
                                                            <option value="B-">B-</option>
                                                            <option value="C+">C+</option>
                                                            <option value="C">C</option>
                                                            <option value="C-">C-</option>
                                                            <option value="D+">D+</option>
                                                            <option value="D">D</option>
                                                            <option value="F">F</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td className="py-2 pr-2">
                                                    <input
                                                        type="number"
                                                        value={course.credits}
                                                        onChange={(e) => updateCourse(semester.id, course.id, 'credits', e.target.value)}
                                                        placeholder="Credits"
                                                        className="w-full p-2 rounded outline-none bg-inherit"
                                                    />
                                                </td>
                                                <td className="py-2 text-green-600 font-bold">
                                                    {course.requiredGrade || '--'}
                                                </td>
                                                <td className="py-2">
                                                    <button
                                                        onClick={() => removeCourse(semester.id, course.id)}
                                                        className="p-1"
                                                    >
                                                        <XIcon className="w-5 h-5 text-gray-400" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="flex items-center justify-between mt-6">
                                    <button
                                        onClick={() => addCourse(semester.id)}
                                        className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Add Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}






                    <div className="flex items-center justify-between mt-2">
                        <button
                            onClick={addSemester}
                            className="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            <div className="flex items-center">
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Add Semester
                            </div>
                        </button>

                        <button
                            onClick={calculateRequiredGPA}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 flex items-center"
                        >

                            Calculate
                        </button>
                    </div>

                    {/* Cumulative Result */}
                    {cumulativeResult && (
                        <div className="mt-4 text-center border shadow-sm bg-green-100 p-5">
                            <p className="text-gray-600 font-semibold">
                                To achieve a target GPA of {targetGPA}, you need to aim for a GPA of
                                <span className="text-2xl text-green-600 font-bold ml-2">
                                    {cumulativeResult.requiredGPA}
                                </span>
                                {' '}in your next {cumulativeResult.additionalCredits} credits.
                            </p>
                        </div>
                    )}
                </div>


                {/* GPA Scale Section */}
                <div className="w-64 bg-white rounded-lg shadow-sm font-custom p-4 self-start">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">GPA Scale</h3>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="text-center text-gray-600 font-custom border-b">
                                <th className="pb-2">Grade</th>
                                <th className="pb-2">Points</th>
                                <th className="pb-2">Range</th>
                                <th className="pb-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {gpaScale.map((item, index) => (
                                <tr key={index} className="border-b text-center font-custom last:border-b-0">
                                    {editingScale === index ? (
                                        <>
                                            <td className="py-1">
                                                <input
                                                    type="text"
                                                    value={item.grade}
                                                    onChange={(e) => updateGpaScale(index, 'grade', e.target.value)}
                                                    className="w-full p-1 border rounded"
                                                />
                                            </td>
                                            <td className="py-1">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={item.points}
                                                    onChange={(e) => updateGpaScale(index, 'points', parseFloat(e.target.value))}
                                                    className="w-full p-1 border rounded"
                                                />
                                            </td>
                                            <td className="py-1 flex">
                                                <input
                                                    type="number"
                                                    value={item.range.min}
                                                    onChange={(e) => updateGpaScale(index, 'min', parseInt(e.target.value))}
                                                    className="w-12 p-1 border rounded mr-1"
                                                />
                                                -
                                                <input
                                                    type="number"
                                                    value={item.range.max}
                                                    onChange={(e) => updateGpaScale(index, 'max', parseInt(e.target.value))}
                                                    className="w-12 p-1 border rounded ml-1"
                                                />
                                            </td>
                                            <td className="py-1">
                                                <button
                                                    onClick={() => setEditingScale(null)}
                                                    className="text-green-500 hover:text-green-700"
                                                >
                                                    ✓
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="py-1">{item.grade}</td>
                                            <td className="py-1">{item.points}</td>
                                            <td className="py-1">{`${item.range.min}-${item.range.max}%`}</td>
                                            <td className="py-1">
                                                <button
                                                    onClick={() => setEditingScale(index)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    <Edit2Icon className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>
            <Tabs/>

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

export default GPAImprovementCalculator;