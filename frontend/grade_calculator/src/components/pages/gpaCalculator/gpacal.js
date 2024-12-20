import React, { useState, useEffect } from 'react';
import { XIcon, ChevronDownIcon, PlusIcon, X, Edit2Icon, ArrowBigRight, Calculator, ArrowRight } from 'lucide-react';
import { Tabs } from '../../UI/tabs/tabs';
import { Hero } from '../../UI/hero/hero';
import { GPAScaleTable } from '../../UI/gpaScale/table';


const GPACalculatorComponent = () => {
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

  const [semesters, setSemesters] = useState([
    {
      id: 1,
      name: 'Semester 1',
      courses: [{ id: Date.now(), name: '', grade: '', credits: '' }],
      semesterGPA: '0.00',
      semesterCredits: 0
    }
  ]);
  const [cumulativeGPA, setCumulativeGPA] = useState('0.00');

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


  const calculateSemesterGPA = (semester) => {
    // Create a grade points map from the current gpaScale
    const gradePoints = {};
    gpaScale.forEach(item => {
      gradePoints[item.grade] = item.points;
    });

    let totalCredits = 0;
    let weightedGradePoints = 0;

    semester.courses.forEach(course => {
      const credits = parseFloat(course.credits) || 0;
      const gradePoint = gradePoints[course.grade] || 0;

      if (credits > 0 && gradePoint > 0) {
        totalCredits += credits;
        weightedGradePoints += credits * gradePoint;
      }
    });

    const semesterGPA = totalCredits > 0
      ? (weightedGradePoints / totalCredits).toFixed(2)
      : '0.00';

    return { semesterGPA, semesterCredits: totalCredits };
  };

  const calculateCumulativeGPA = () => {
    let totalCredits = 0;
    let totalWeightedGradePoints = 0;

    semesters.forEach(semester => {
      const { semesterGPA, semesterCredits } = calculateSemesterGPA(semester);
      const gradePoints = parseFloat(semesterGPA);

      if (semesterCredits > 0) {
        totalCredits += semesterCredits;
        totalWeightedGradePoints += gradePoints * semesterCredits;
      }
    });

    return totalCredits > 0
      ? (totalWeightedGradePoints / totalCredits).toFixed(2)
      : '0.00';
  };

  useEffect(() => {
    const updatedSemesters = semesters.map(semester => {
      const { semesterGPA, semesterCredits } = calculateSemesterGPA(semester);
      return {
        ...semester,
        semesterGPA,
        semesterCredits
      };
    });

    setSemesters(updatedSemesters);
    setCumulativeGPA(calculateCumulativeGPA());
  }, [semesters.map(s => s.courses).flat(), gpaScale]);


  // Rest of the component methods remain the same as in the previous version
  const addSemester = () => {
    setSemesters([
      ...semesters,
      {
        id: Date.now(),
        name: `Semester ${semesters.length + 1}`,
        courses: [{ id: Date.now(), name: '', grade: '', credits: '' }],
        semesterGPA: '0.00',
        semesterCredits: 0
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
          ...semester,
          courses: [...semester.courses, { id: Date.now(), name: '', grade: '', credits: '' }]
        }
        : semester
    ));
  };

  const removeCourse = (semesterId, courseId) => {
    setSemesters(semesters.map(semester =>
      semester.id === semesterId
        ? {
          ...semester,
          courses: semester.courses.filter(course => course.id !== courseId)
        }
        : semester
    ));
  };

  const updateCourse = (semesterId, courseId, field, value) => {
    setSemesters(semesters.map(semester =>
      semester.id === semesterId
        ? {
          ...semester,
          courses: semester.courses.map(course =>
            course.id === courseId
              ? { ...course, [field]: value }
              : course
          )
        }
        : semester
    ));

  };



  return (
    <div className="max-w-6xl mx-auto pt-6 pr-3 pl-3 font-custom bg-blue-50 rounded-lg">

      <Hero />



      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">

        {/* Main Table Section */}
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
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative font-custom">
                <table className="w-full border-b">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="pb-2 font-semibold">Course</th>
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
                            placeholder="Math"
                            className="w-full p-2 bg-inherit outline-none"
                          />
                        </td>
                        <td className="py-2 border pr-2">
                          <div className="relative">
                            <select
                              value={course.grade || "--"}
                              onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                              className="w-full p-2 rounded outline-none appearance-none bg-inherit"
                            >

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
                            placeholder="4"
                            className="w-full p-2 rounded outline-none bg-inherit"
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
                  <span className="text-2xl text-green-600 font-bold">{semester.semesterGPA}</span>
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
          <div className="mt-4 text-center border shadow-sm bg-green-100 p-5">
            <span className="text-gray-600 rounded-full font-semibold">Cumulative GPA: </span>
            <span className="text-2xl text-green-600 font-bold">{cumulativeGPA}</span>
          </div>
        </div>

        {/* GPA Scale Table */}
        <div className="w-full md:w-auto md:flex-none">
          <GPAScaleTable />
        </div>

      </div>



      <Tabs />



      <div className='flex flex-col mt-10 text-left font-custom '>
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

export default GPACalculatorComponent;