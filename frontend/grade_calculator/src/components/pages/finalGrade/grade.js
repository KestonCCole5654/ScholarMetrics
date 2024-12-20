import React, { useState } from 'react';
import { XIcon } from 'lucide-react';

const FinalGradeCalculator = () => {
  const [currentGrade, setCurrentGrade] = useState(92);
  const [desiredGrade, setDesiredGrade] = useState(100);
  const [finalWeight, setFinalWeight] = useState(50);

  const calculateNeededFinalGrade = () => {
    // Prevent division by zero
    if (finalWeight === 0) return 0;

    const currentWeightedGrade = (currentGrade * (100 - finalWeight)) / 100;
    const neededFinalGrade = (desiredGrade - currentWeightedGrade) * 100 / finalWeight;
    return Math.max(0, Math.min(100, neededFinalGrade));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Final Grade Calculator</h1>
      <div className="relative font-custom">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="pb-2 font-semibold">Current Grade </th>
              <th className="pb-2 font-semibold">Desired Grade </th>
              <th className="pb-2 font-semibold">Final Exam Weight </th>
              <th className="pb-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border last:border-b-0">
              <td className="py-2 border pr-2">
                <input
                  type="text"
                  className="w-full p-2 bg-inherit outline-none"
                  placeholder="Enter your Current Grade in class ... "
                  value={currentGrade}
                  onChange={(e) => setCurrentGrade(Number(e.target.value))}
                />
              </td>
              <td className="py-2 border pr-2">
                <input
                  type="number"
                  className="w-full p-2 bg-inherit outline-none"
                  placeholder="Enter your Desired Grade (%)"
                  value={desiredGrade}
                  min="0"
                  max="100"
                  onChange={(e) => setDesiredGrade(Number(e.target.value))}
                />
              </td>
              <td className="py-2 border-b pr-2">
                <input
                  type="number"
                  className="w-full p-2 bg-inherit outline-none"
                  placeholder="Enter the Final Exam Weight (%)"
                  value={finalWeight}
                  min="0"
                  max="100"
                  onChange={(e) => setFinalWeight(Number(e.target.value))}
                />
              </td>
              <td className="py-2 border-b px-4">
                <button
                  className="hover:bg-gray-100 rounded-full p-1 transition-colors"
                  onClick={calculateNeededFinalGrade}
                >
                  <XIcon className="w-5 h-5 text-gray-400" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6">
          <div className="text-center">
            <p className="text-lg font-medium">
              <span className="text-gray-600">Total Weight: </span>
              <span
                className={`font-bold text-xl ${finalWeight > 100 ? "text-red-600" : "text-green-600"}`}
              >
                {finalWeight}%
              </span>
            </p>
            <p className="mt-4 text-center border shadow-sm bg-green-100 p-5">
              <span className="text-gray-600">Score Needed on Final Exam to achieve the desired grade is :</span>
              <span className="text-green-600 font-bold text-2xl">
                {calculateNeededFinalGrade().toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalGradeCalculator;