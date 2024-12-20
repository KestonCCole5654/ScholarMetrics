import React, { useState } from 'react';
import { XIcon, PlusIcon, ChevronDownIcon } from 'lucide-react';

const FinalGradeCalculator = () => {
  const [semesters, setSemesters] = useState([
    { 
      id: 1, 
      name: 'Course Calculation', 
      courses: [{ 
        id: 1, 
        name: '', 
        currentGrade: '', 
        finalWeight: '',
        desiredGrade: ''
      }],
      requiredFinalScore: null
    }
  ]);

  // Grade to numeric conversion
  const gradeToNumeric = {
    'A+': 97, 'A': 93, 'A-': 90,
    'B+': 87, 'B': 83, 'B-': 80,
    'C+': 77, 'C': 73, 'C-': 70,
    'D+': 67, 'D': 63, 'D-': 60,
    'F': 0
  };

  // Calculate required final exam score
  const calculateRequiredScore = (semester) => {
    const course = semester.courses[0];
    
    // Validate inputs
    if (!course.currentGrade || !course.finalWeight || !course.desiredGrade) {
      return null;
    }

    // Convert current grade and desired final grade to numeric values
    const currentNumericGrade = gradeToNumeric[course.currentGrade];
    const desiredNumericGrade = gradeToNumeric[course.desiredGrade];

    // Convert final weight to a decimal
    const finalExamWeight = parseFloat(course.finalWeight) / 100;
    const currentWeight = 1 - finalExamWeight;

    // Calculate required final exam score
    const requiredScore = 
      (desiredNumericGrade - (currentNumericGrade * currentWeight)) / finalExamWeight;

    // Ensure the score is within 0-100 range
    return Math.max(0, Math.min(100, requiredScore)).toFixed(2);
  };

  // Add semester (course calculation)
  const addSemester = () => {
    setSemesters(prev => [...prev, {
      id: prev.length + 1,
      name: `Course Calculation ${prev.length + 1}`,
      courses: [{ 
        id: 1, 
        name: '', 
        currentGrade: '', 
        finalWeight: '',
        desiredGrade: ''
      }],
      requiredFinalScore: null
    }]);
  };

  // Remove semester
  const removeSemester = (semesterId) => {
    setSemesters(prev => prev.filter(semester => semester.id !== semesterId));
  };

  // Add course to semester
  const addCourse = (semesterId) => {
    setSemesters(prev => prev.map(semester => 
      semester.id === semesterId 
        ? {
            ...semester, 
            courses: [...semester.courses, { 
              id: semester.courses.length + 1, 
              name: '', 
              currentGrade: '', 
              finalWeight: '',
              desiredGrade: ''
            }]
          }
        : semester
    ));
  };

  // Remove course from semester
  const removeCourse = (semesterId, courseId) => {
    setSemesters(prev => prev.map(semester => 
      semester.id === semesterId
        ? {
            ...semester,
            courses: semester.courses.filter(course => course.id !== courseId)
          }
        : semester
    ));
  };

  // Update course details
  const updateCourse = (semesterId, courseId, field, value) => {
    setSemesters(prev => {
      const updatedSemesters = prev.map(semester => 
        semester.id === semesterId
          ? {
              ...semester,
              courses: semester.courses.map(course => 
                course.id === courseId 
                  ? { ...course, [field]: value }
                  : course
              ),
              requiredFinalScore: calculateRequiredScore({
                ...semester,
                courses: semester.courses.map(course => 
                  course.id === courseId 
                    ? { ...course, [field]: value }
                    : course
                )
              })
            }
          : semester
      );
      return updatedSemesters;
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Final Grade Calculator
      </h1>

      <div className="flex-grow font-custom">
        {semesters.map((semester) => (
          <div key={semester.id} className="mb-8 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {semester.name}
              </h2>
              {semesters.length > 1 && (
                <div className="absolute top-0 right-0">
                  <button
                    onClick={() => removeSemester(semester.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove Calculation"
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
                    <th className="pb-2 font-semibold">Current Grade</th>
                    <th className="pb-2 font-semibold">Final Exam Weight (%)</th>
                    <th className="pb-2 font-semibold">Desired Grade</th>
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
                            value={course.currentGrade || ""}
                            onChange={(e) => updateCourse(semester.id, course.id, 'currentGrade', e.target.value)}
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
                          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="number"
                          value={course.finalWeight}
                          onChange={(e) => updateCourse(semester.id, course.id, 'finalWeight', e.target.value)}
                          placeholder="Weight"
                          min="0"
                          max="100"
                          className="w-full p-2 rounded outline-none bg-inherit"
                        />
                      </td>
                      <td className="py-2 border pr-2">
                        <div className="relative">
                          <select
                            value={course.desiredGrade || ""}
                            onChange={(e) => updateCourse(semester.id, course.id, 'desiredGrade', e.target.value)}
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
                          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
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

              {/* Required Final Score */}
              {semester.requiredFinalScore !== null && (
                <div className="mt-4 text-center">
                  <span className="text-gray-600 font-semibold">Required Final Exam Score: </span>
                  <span className="text-2xl text-green-600 font-bold">
                    {semester.requiredFinalScore}%
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => addCourse(semester.id)}
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Course
              </button>
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
              Add Calculation
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalGradeCalculator;