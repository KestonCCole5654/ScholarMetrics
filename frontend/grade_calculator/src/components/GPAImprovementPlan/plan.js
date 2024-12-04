import React from 'react';

// Sample data for preview
const sampleData = {
  current_gpa: 3.2,
  desired_gpa: 3.5,
  course_requirements: [
    {
      credits: 3,
      name: "Math",
      lowest_required_grade: "A-",
      highest_required_grade: "A+"
    },
    {
      credits: 4,
      name: "Physics",
      lowest_required_grade: "A+",
      highest_required_grade: "A+"
    }
  ]
};

function GPAImprovementPlan({ data = sampleData }) {
  // Check if data is valid
  if (!data || !data.course_requirements || data.course_requirements.length === 0) {
    return (
      <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-semibold">Error</h3>
        </div>
        <p className="mt-2">Unable to load GPA improvement plan. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 text-white overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-orange-500">GPA Improvement Plan</h2>
          <div className="flex justify-between mt-2">
            <p className="text-gray-300">
              Current GPA: <span className="text-white font-semibold">{data.current_gpa.toFixed(2)}</span>
            </p>
            <p className="text-gray-300">
              Target GPA: <span className="text-white font-semibold">{data.desired_gpa.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-left text-orange-500">Subject</th>
                  <th className="px-4 py-2 text-left text-orange-500">Credits</th>
                  <th className="px-4 py-2 text-left text-orange-500">Lowest Required Grade</th>
                  <th className="px-4 py-2 text-left text-orange-500">Highest Required Grade</th>
                </tr>
              </thead>
              <tbody>
                {data.course_requirements.map((course, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-4 py-2">{course.name}</td>
                    <td className="px-4 py-2">{course.credits}</td>
                    <td className="px-4 py-2">{course.lowest_required_grade}</td>
                    <td className="px-4 py-2">{course.highest_required_grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GPAImprovementPlan;