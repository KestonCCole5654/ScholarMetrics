
        {/* Main Table Section */}
        <div className="flex-grow font-custom">
          {semesters.map((semester) => (
            <div key={semester.id} className="mb-8 relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{semester.name}</h2>
                {semesters.length > 1 && (
                  <div className="absolute top-0 right-0">
                    <button
                      onClick={() => removeSemester(semester.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove Semester"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative font-custom ">
                <table className="w-full border-b">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="pb-2 font-semibold">Course name</th>
                      <th className="pb-2 font-semibold">Grade</th>
                      <th className="pb-2 font-semibold">Credits</th>
                      <th className="pb-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {semester.courses.map((course) => (
                      <tr key={course.id} className="border last:border-b-0">
                        <td className="py-2 pr-2">
                          <input
                            type="text"
                            value={course.name}
                            onChange={(e) => updateCourse(semester.id, course.id, 'name', e.target.value)}
                            placeholder="Course name"
                            className="w-full p-2 bg-inherit outline-none"
                          />
                        </td>
                        <td className="py-2 border pr-2">
                          <div className="relative">
                            <select
                              value={course.grade || "--"}
                              onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                              className="w-full p-2 rounded outline-none appearance-none bg-inherit"
                            >
                              <option value=""> -- </option>
                              <option value="A+">A+</option>
                              <option value="A">A</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B">B</option>
                              <option value="B-">B-</option>
                              <option value="C+">C+</option>
                              <option value="C">C</option>
                              <option value="C-">C-</option>
                              <option value="D+">D+</option>
                              <option value="D">D</option>
                              <option value="F">F</option>
                            </select>
                            <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            type="number"
                            value={course.credits}
                            onChange={(e) => updateCourse(semester.id, course.id, 'credits', e.target.value)}
                            placeholder="Credits"
                            className="w-full p-2 rounded outline-none bg-inherit"
                          />
                        </td>
                        <td className="py-2">
                          <button
                            onClick={() => removeCourse(semester.id, course.id)}
                            className="p-1"
                          >
                            <XIcon className="w-5 h-5 text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Semester GPA */}
                <div className="mt-4 text-center">
                  <span className="text-gray-600 font-semibold">Semester GPA: </span>
                  <span className="text-2xl text-green-600 font-bold">{semester.semesterGPA}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => addCourse(semester.id)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Course
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-2">
            <button
              onClick={addSemester}
              className="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <div className="flex items-center">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Semester
              </div>
            </button>
          </div>

          {/* Cumulative GPA */}
          <div className="mt-4 text-center">
            <span className="text-gray-600 rounded-full font-semibold">Cumulative GPA: </span>
            <span className="text-2xl text-green-600 font-bold">{cumulativeGPA}</span>
          </div>
        </div>
