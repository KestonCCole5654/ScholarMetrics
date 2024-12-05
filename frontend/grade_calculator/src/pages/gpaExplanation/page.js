import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function GPAExplanation() {
  return (
    <div className="space-y-8  text-left  text-white">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-2">How is GPA Calculated?</h2>
        <p className="text-gray-400 mb-6">
          Understanding the conversion process from grades to GPA points
        </p>
        
        {/* Step 1: Grade Conversion */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">1. Grade Conversion</h3>
          <p className="text-sm text-gray-400 mb-4">
            First, grades are converted to the U.S. equivalent for international students:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">Chinese Grade</th>
                  <th scope="col" className="px-6 py-3">U.S. Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4">90</td>
                  <td className="px-6 py-4">A</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-6 py-4">85</td>
                  <td className="px-6 py-4">B</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">80</td>
                  <td className="px-6 py-4">B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Step 2: Point Conversion */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">2. Grade to Points Conversion</h3>
          <p className="text-sm text-gray-400 mb-4">
            Each U.S. grade is converted to points on a 4.0 scale:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              [['A+', '4.0'], ['A', '4.0'], ['A-', '3.7']],
              [['B+', '3.3'], ['B', '3.0'], ['B-', '2.7']],
              [['C+', '2.3'], ['C', '2.0'], ['C-', '1.7']],
              [['D+', '1.3'], ['D', '1.0'], ['D-', '0.7']]
            ].map((gradeSet, index) => (
              <div key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left text-gray-400">
                  <thead className="text-xs uppercase bg-gray-600">
                    <tr>
                      <th scope="col" className="px-6 py-3">Grade</th>
                      <th scope="col" className="px-6 py-3">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradeSet.map(([grade, points], i) => (
                      <tr key={i} className="border-b border-gray-600 last:border-b-0">
                        <td className="px-6 py-4">{grade}</td>
                        <td className="px-6 py-4">{points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Calculation Example */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">3. Final Calculation</h3>
          <p className="text-sm text-gray-400 mb-4">
            The GPA is calculated by multiplying each course's points by its credits, then dividing by the total credits:
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="bg-gray-700 rounded-lg p-4 flex-1 w-full">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-600">
                  <tr>
                    <th scope="col" className="px-4 py-2">Credits</th>
                    <th scope="col" className="px-4 py-2">Grade</th>
                    <th scope="col" className="px-4 py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-600">
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">A</td>
                    <td className="px-4 py-2">4.0</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">B</td>
                    <td className="px-4 py-2">3.0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">B</td>
                    <td className="px-4 py-2">3.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ArrowRight className="h-6 w-6 text-orange-500" />
            <div className="bg-gray-700 rounded-lg p-4 flex-1 w-full">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-600">
                  <tr>
                    <th scope="col" className="px-4 py-2">Calculation</th>
                    <th scope="col" className="px-4 py-2">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-600">
                    <td className="px-4 py-2">3 × 4.0 =</td>
                    <td className="px-4 py-2">12.0</td>
                  </tr>
                  <tr className="border-b border-gray-600">
                    <td className="px-4 py-2">3 × 3.0 =</td>
                    <td className="px-4 py-2">9.0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">2 × 3.0 =</td>
                    <td className="px-4 py-2">6.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ArrowRight className="h-6 w-6 text-orange-500" />
            <div className="bg-gray-700 rounded-lg p-4 flex-1 w-full">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Points</p>
                  <p className="text-2xl font-bold">27.0</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Credits</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Final GPA</p>
                  <p className="text-2xl font-bold text-orange-500">3.38</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
            <li>Some schools use .5 steps (e.g., A- or B+ convert to 3.5)</li>
            <li>AP classes may receive an extra point, making the GPA scale go up to 5.0 (weighted GPA)</li>
            <li>A+ grades are sometimes worth 4.3 points, but many universities cap at 4.0</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

