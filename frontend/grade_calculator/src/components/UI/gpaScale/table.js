import React, { useState } from 'react';

const defaultGpaScale = [
  { grade: 'A', points: 4.0, range: { min: 90, max: 100 } },
  { grade: 'B', points: 3.0, range: { min: 80, max: 89 } },
  { grade: 'C', points: 2.0, range: { min: 70, max: 79 } },
  { grade: 'D', points: 1.0, range: { min: 60, max: 69 } },
  { grade: 'F', points: 0.0, range: { min: 0, max: 59 } },
];

export function GPAScaleTable({ gpaScale = defaultGpaScale, updateGpaScale }) {
  const [editingScale, setEditingScale] = useState(null);

  const handleUpdate = (index, field, value) => {
    if (updateGpaScale) {
      updateGpaScale(index, field, value);
    } else {
      console.warn('updateGpaScale function is not provided');
    }
  };

  if (!Array.isArray(gpaScale) || gpaScale.length === 0) {
    return <div className="text-red-500">Error: Invalid GPA scale data</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-full p-6 max-w-md   w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">GPA Scale</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="pb-2 px-2 font-semibold">Grade</th>
              <th className="pb-2 px-2 font-semibold">Points</th>
              <th className="pb-2 px-2 font-semibold">Range</th>
              <th className="pb-2 px-2 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {gpaScale.map((item, index) => (
              <tr key={index} className="border-b last:border-b-0">
                {editingScale === index ? (
                  <>
                    <td className="py-2">
                      <input
                        type="text"
                        value={item.grade}
                        onChange={(e) => handleUpdate(index, 'grade', e.target.value)}
                        className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                     
                        value={item.points}
                        onChange={(e) => handleUpdate(index, 'points', (e.target.value))}
                        className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2 flex items-center space-x-1">
                      <input
                        type="number"
                        value={item.range.min}
                        onChange={(e) => handleUpdate(index, 'min', parseInt(e.target.value))}
                        className="w-14 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={item.range.max}
                        onChange={(e) => handleUpdate(index, 'max', parseInt(e.target.value))}
                        className="w-14 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => setEditingScale(null)}
                        className="text-green-500 hover:text-green-700 transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2">{item.grade}</td>
                    <td className="py-2">{item.points}</td>
                    <td className="py-2">{`${item.range.min}-${item.range.max}%`}</td>
                    <td className="py-2">
                      <button
                        onClick={() => setEditingScale(index)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
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
  );
}
