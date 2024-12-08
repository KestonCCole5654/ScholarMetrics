import React from "react";
import { X, Crown, AlertCircle } from 'lucide-react';

const ScaleModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800 text-white w-full max-w-md p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center space-x-1">
            <Crown className="w-4 h-4" />
            <span>Premium Feature</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Custom GPA Scale Creator</h2>
        
        <div className="space-y-4 text-left mb-6">
          <p className="text-gray-300  text-center">
            Create and manage custom GPA scales tailored to your institution's grading system.
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 text-blue-400" />
              <span>Define custom grade points for each letter grade</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 text-blue-400" />
              <span>Support for various grading systems (A+, A, A-, etc.)</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 text-blue-400" />
              <span>Save and manage multiple custom scales</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-300 text-center">
            We're working hard to bring you this feature soon. Stay tuned for updates!
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition-colors font-semibold"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default ScaleModal;
