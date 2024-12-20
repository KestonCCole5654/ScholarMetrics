import React, { useState } from "react";
import { XIcon, ChevronDownIcon, PlusIcon, X, Edit2Icon, ArrowBigRight, Calculator, ArrowRight } from 'lucide-react';
import { Tabs } from "../../UI/tabs/tabs";

function MidtermCalculator() {

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

  const [categories, setCategories] = useState([
    { id: 1, name: "Assignments", weight: 30, score: 90 },
    { id: 2, name: "Quizzes", weight: 20, score: 85 },
    { id: 3, name: "Midterm Exam", weight: 50, score: 80 },
  ]);

  const handleChange = (id, field, value) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === id
          ? {
            ...cat,
            [field]: field === "weight" || field === "score" ? parseFloat(value) || 0 : value,
          }
          : cat
      )
    );
  };

  const calculateGrade = () => {
    const totalGrade = categories.reduce((total, cat) => total + (cat.score * cat.weight) / 100, 0);
    return totalGrade.toFixed(2);
  };

  const calculateTotalWeight = () => {
    return categories.reduce((total, cat) => total + cat.weight, 0);
  };

  const addCategory = () => {
    setCategories([
      ...categories,
      { id: Date.now(), name: "", weight: 0, score: 0 },
    ]);
  };

  const removeCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto pt-6 pr-3 pl-3 font-custom bg-blue-50 rounded-lg">
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




      <div className="flex space-x-6">
        <div className="flex-grow font-custom">
        <div>
                        <h1 className='text-2xl font-semibold text-gray-800 text-left mb-5 mt-5'>Midterm Calculator</h1>
                    </div>
          {/* Main Table Section */}
          <div className="relative font-custom">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="pb-2  font-semibold">Category Name</th>
                  <th className="pb-2  font-semibold">Score (%)</th>
                  <th className="pb-2  font-semibold">Weight (%)</th>
                  <th className="pb-2  w-10"></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border last:border-b-0 ">
                    <td className="py-2 border pr-2">
                      <input
                        type="text"
                        className="w-full p-2 bg-inherit outline-none"
                        placeholder="Category name"
                        value={category.name}
                        onChange={(e) =>
                          handleChange(category.id, "name", e.target.value)
                        }
                      />
                    </td>
                    <td className="py-2 border pr-2">
                      <input
                        type="number"
                        className="w-full p-2 bg-inherit outline-none"
                        placeholder="Score (%)"
                        value={category.score}
                        min="0"
                        max="100"
                        onChange={(e) =>
                          handleChange(category.id, "score", e.target.value)
                        }
                      />
                    </td>
                    <td className="py-2 border-b pr-2">
                      <input
                        type="number"
                        className="w-full p-2 bg-inherit outline-none"
                        placeholder="Weight (%)"
                        value={category.weight}
                        min="0"
                        max="100"
                        onChange={(e) =>
                          handleChange(category.id, "weight", e.target.value)
                        }
                      />
                    </td>
                    <td className="py-2 border-b px-4">
                      <button
                        onClick={() => removeCategory(category.id)}
                      >
                        <XIcon className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6">
              <div className="text-center">
                <p className="text-lg font-medium">
                  <span className="text-gray-600">Total Weight: </span>
                  <span
                    className={`font-bold text-xl ${calculateTotalWeight() > 100 ? "text-red-600" : "text-green-600"
                      }`}
                  >
                    {calculateTotalWeight()}%
                  </span>
                </p>
                <p className="mt-4 text-center border shadow-sm bg-green-100 p-5">
                  <span className="text-gray-600">Final Grade: </span>
                  <span className="text-green-600 font-bold text-2xl">
                    {calculateGrade()}%
                  </span>
                </p>
              </div>

              <div className="mt-4 flex justify-start">
                <button
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                  onClick={addCategory}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>

      
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
}

export default MidtermCalculator;
