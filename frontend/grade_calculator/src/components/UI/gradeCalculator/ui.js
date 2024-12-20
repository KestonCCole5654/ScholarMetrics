import React, { useState, useEffect } from 'react';
import { X, XIcon, ChevronDownIcon, PlusIcon } from 'lucide-react';

const GradeCalculator = () => {
  const [semesters, setSemesters] = useState([
    { 
      id: 1, 
      name: 'Semester 1', 
      courses: [{ id: 1, name: '', grade: '', credits: '' }],
      semesterGPA: '0.00'
    }
  ]);

  const [cumulativeGPA, setCumulativeGPA] = useState('0.00');

  // Grade to grade point conversion
  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  // Calculate semester GPA
  const calculateSemesterGPA = (courses) => {
    const totalCredits = courses.reduce((sum, course) => 
      course.credits && course.grade ? sum + parseFloat(course.credits) : sum, 0);
    
    const totalPoints = courses.reduce((sum, course) => 
      course.credits && course.grade 
        ? sum + (parseFloat(course.credits) * gradePoints[course.grade]) 
        : sum, 0);
    
    return totalCredits > 0 
      ? (totalPoints / totalCredits).toFixed(2) 
      : '0.00';
  };

  // Calculate cumulative GPA
  useEffect(() => {
    const totalCredits = semesters.reduce((sum, semester) => 
      sum + semester.courses.reduce((credits, course) => 
        course.credits && course.grade 
          ? credits + parseFloat(course.credits) 
          : credits, 0), 0);
    
    const totalPoints = semesters.reduce((sum, semester) => 
      sum + semester.courses.reduce((points, course) => 
        course.credits && course.grade 
          ? points + (parseFloat(course.credits) * gradePoints[course.grade]) 
          : points, 0), 0);
    
    setCumulativeGPA(totalCredits > 0 
      ? (totalPoints / totalCredits).toFixed(2) 
      : '0.00');
  }, [semesters]);

  // Add semester
  const addSemester = () => {
    setSemesters(prev => [...prev, {
      id: prev.length + 1,
      name: `Semester ${prev.length + 1}`,
      courses: [{ id: 1, name: '', grade: '', credits: '' }],
      semesterGPA: '0.00'
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
              grade: '', 
              credits: '' 
            }],
            semesterGPA: calculateSemesterGPA([...semester.courses, { 
              id: semester.courses.length + 1, 
              name: '', 
              grade: '', 
              credits: '' 
            }])
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
            courses: semester.courses.filter(course => course.id !== courseId),
            semesterGPA: calculateSemesterGPA(
              semester.courses.filter(course => course.id !== courseId)
            )
          }
        : semester
    ));
  };

  // Update course details
  const updateCourse = (semesterId, courseId, field, value) => {
    setSemesters(prev => prev.map(semester => 
      semester.id === semesterId
        ? {
            ...semester,
            courses: semester.courses.map(course => 
              course.id === courseId 
                ? { ...course, [field]: value }
                : course
            ),
            semesterGPA: calculateSemesterGPA(
              semester.courses.map(course => 
                course.id === courseId 
                  ? { ...course, [field]: value }
                  : course
              )
            )
          }
        : semester
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        GPA Calculator
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
                    title="Remove Semester"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>

            <div className="relative font-custom">
              <table className="w-full border-b">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="pb-2 font-semibold">Course name</th>
                    <th className="pb-2 font-semibold">Grade</th>
                    <th className="pb-2 font-semibold">Credits</th>
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
                          <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="number"
                          value={course.credits}
                          onChange={(e) => updateCourse(semester.id, course.id, 'credits', e.target.value)}
                          placeholder="Credits"
                          className="w-full p-2 rounded outline-none bg-inherit"
                          min="0"
                        />
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

              {/* Semester GPA */}
              <div className="mt-4 text-center">
                <span className="text-gray-600 font-semibold">Semester GPA: </span>
                <span className="text-2xl text-green-600 font-bold">
                  {semester.semesterGPA}
                </span>
              </div>
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
              Add Semester
            </div>
          </button>
        </div>

        {/* Cumulative GPA */}
        <div className="mt-4 text-center">
          <span className="text-gray-600 rounded-full font-semibold">
            Cumulative GPA: 
          </span>
          <span className="text-2xl text-green-600 font-bold">
            {cumulativeGPA}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GradeCalculator;