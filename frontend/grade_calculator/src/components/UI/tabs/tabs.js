import React from 'react';
import { Calculator } from 'lucide-react';

const calculators = [
  { name: 'Grade Calculator', href: '/grade-calculator' },
  { name: 'College GPA Calculator', href: '/gpa-calculator' },
  { name: 'RaiseGPA Calculator', href: '/raise-gpa' },
  { name: 'Final Grade Calculator', href: '/finalgrade-calculator' },
  { name: 'Midterm Grade Calculator', href: '/midterm-calculator' },
];

export function Tabs() {
  return (
    <div className="mt-10  max-w-6xl mx-auto px-0 sm:px-0 lg:px-0">
      <h2 className="text-2xl font-bold text-left font-custom text-gray-900 mb-6"> Other Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator) => (
          <a
            key={calculator.href}
            href={calculator.href}
            className="group bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="p-6 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Calculator className="h-6 w-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                  {calculator.name}
                </p>
              </div>
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

