'use client';

import React from 'react';

export default function GpaReport({
  totalCredits = 0,
  courses = [],
  gpa,
  error
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto print:shadow-none  p-4 rounded-lg overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-4 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className='text-gray-400 font-medium'>Generated GPA Reports Summary</span>
          </div>
          {/* Uncomment the button below if print functionality is needed */}
          {/* 
          <button 
            onClick={handlePrint} 
            className="print:hidden bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Print Report
          </button>
          */}
        </div>
        <h1 className="text-2xl sm:text-2xl font-bold text-center text-gray-100">GPA Report</h1>
      </div>
      <div className="p-4 sm:p-6 space-y-6">
        {courses.length > 0 ? (
          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Course Name</th>
                    <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Course Name</th>
                    <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Credits / Hours</th>
                    <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {courses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-700/50">
                      <td className="py-2 sm:py-3 px-4 whitespace-nowrap text-sm text-left text-gray-300">{course.name}</td>
                      <td className="py-2 sm:py-3 px-4 whitespace-nowrap text-sm text-right text-gray-300">{course.credits}</td>
                      <td className="py-2 sm:py-3 px-4 whitespace-nowrap text-sm text-right text-gray-300">{course.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No courses added yet.</p>
        )}

        <div className="flex flex-col gap-2 text-right">
          <div className="flex justify-end items-center gap-2">
            <span className="text-gray-400">Total Credits:</span>
            <span className="font-medium">{totalCredits}</span>
          </div>
          {gpa !== null && (
            <div className="flex justify-end items-center gap-2">
              <span className="font-semibold text-gray-300">Cumulative GPA:</span>
              <span className="text-xl font-bold text-orange-500">{gpa.toFixed(2)}</span>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
