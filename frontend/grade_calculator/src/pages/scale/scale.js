import React, { useState } from "react";
import { Trash2, Plus, ChevronDown } from 'lucide-react';

const gradeOptions = [
  'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D+', 'D', 'D-',
  'F'
];

const ScaleModal = ({ isOpen, onClose, onSave, currentScale }) => {
  const [customScale, setCustomScale] = useState([...currentScale]);

  const updateGrade = (index, field, value) => {
    const updatedScale = customScale.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setCustomScale(updatedScale);
  };

  const deleteGrade = (index) => {
    setCustomScale(customScale.filter((_, i) => i !== index));
  };

  const addGrade = () => {
    setCustomScale([...customScale, { grade: gradeOptions[0], value: "" }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 text-white w-full max-w-lg p-4 sm:p-6 rounded-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit GPA Scale</h2>
        <p className="text-gray-400 mb-4 text-sm sm:text-base">Adjust your GPA scale values below:</p>
        <div className="space-y-4">
          {customScale.map((entry, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="relative w-full sm:w-auto flex-1">
                <select
                  value={entry.grade}
                  onChange={(e) => updateGrade(index, "grade", e.target.value)}
                  className="w-full appearance-none bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 pr-8 text-sm"
                >
                  {gradeOptions.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
              <input
                type="number"
                value={entry.value}
                onChange={(e) => updateGrade(index, "value", e.target.value)}
                placeholder="GPA Value (e.g., 4.0)"
                className="w-full sm:w-auto flex-1 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                step="0.1"
                min="0"
                max="4"
              />
              <button
                onClick={() => deleteGrade(index)}
                className="text-red-500 hover:text-red-700 p-2 sm:p-0"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addGrade}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 w-full sm:w-auto flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Grade
        </button>
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(customScale);
              onClose();
            }}
            className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 w-full sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScaleModal;

