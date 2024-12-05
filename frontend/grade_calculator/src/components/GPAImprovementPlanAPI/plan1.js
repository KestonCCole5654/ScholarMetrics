import React, { useState } from 'react';
import axios from 'axios';
import { Plus, Trash2 } from 'lucide-react';
import GPAImprovementPlan from '../GPAImprovementPlan/plan';
import UploadSection from '../module_pg/UploadSection/uploadsection';

const GPAImprovementPlanAPI = ({
  apiUrl = 'http://localhost:5000/calculate'
}) => {
  const [courses, setCourses] = useState([
    { name: '', credits: 0, grade: '' }
  ]);
  const [currentGPA, setCurrentGPA] = useState('');
  const [desiredGPA, setDesiredGPA] = useState('');
  const [gpaScale, setGpaScale] = useState('4.0');
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addCourseRow = () => {
    setCourses([...courses, { name: '', credits: 0, grade: '' }]);
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(apiUrl, {
        courses: courses,
        current_gpa: parseFloat(currentGPA),
        desired_gpa: parseFloat(desiredGPA),
        gpa_scale: parseFloat(gpaScale)
      });

      setResultData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div >

      <div>
        <UploadSection />
      </div>
      <div>
        or
      </div>


      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-1xl font-semibold text-left mb-5">Enter Your Modules</h1>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg">
            <p>Error: {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div >

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-left mb-2">Current GPA</label>
                <input
                  type="number"
                  step="0.01"
                  value={currentGPA}
                  onChange={(e) => setCurrentGPA(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                  placeholder="e.g., 3.5"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-left mb-2">Desired GPA</label>
                <input
                  type="number"
                  step="0.01"
                  value={desiredGPA}
                  onChange={(e) => setDesiredGPA(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                  placeholder="e.g., 3.8"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-left mb-2 ">GPA Scale</label>
                <select
                  value={gpaScale}
                  onChange={(e) => setGpaScale(e.target.value)}
                  className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600"
                >
                  <option value="4.0">4.0 scale</option>
                  <option value="4.3">4.3 scale</option>
                  <option value="5.0">5.0 scale</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-800">
            <div className="space-y-4">
              {courses.map((course, index) => (

                <div key={index} className="flex flex-col md:flex-row gap-4 pb-4 border-b border-gray-700 last:border-b-0">
                  <input
                    type="text"
                    placeholder="Enter Course Name"
                    value={course.name}
                    onChange={(e) => updateCourse(index, 'name', e.target.value)}
                    className="flex-grow bg-gray-700 text-white p-2 rounded border border-gray-600"
                    required
                  />

                  <input
                    type="number"
                    placeholder="Credits"
                    value={course.credits}
                    onChange={(e) => updateCourse(index, 'credits', Number(e.target.value))}
                    className="w-full md:w-24 bg-gray-700 text-white p-2 rounded border border-gray-600"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => removeCourse(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <div className="flex flex-col md:flex-row gap-4 mt-6" >

                <button
                  type="button"
                  onClick={addCourseRow}
                  className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 flex items-center justify-center"
                >
                  <Plus size={20} className="mr-2" />
                  Add Module
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600 flex-1 md:flex-none"
                >
                  {isLoading ? 'Calculating...' : ' What Grades Do I Need ?'}
                </button>

              </div>

            </div>
          </div>





        </form>

        {resultData && (
          <div className="mt-6">
            <GPAImprovementPlan data={resultData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GPAImprovementPlanAPI;

