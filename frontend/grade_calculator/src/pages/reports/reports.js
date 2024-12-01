import { useState } from 'react'
import { Search, Filter, Download, Printer, Trash2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

export default function ReportsHistory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data - replace with actual data from your backend
  const reports = [
    {
      id: 'N/A',
      type: 'N/A',
      status: 'N/A',
      date: 'N/A',
      courses: 0,
      grade: 'N/A'
    }
  ]

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.date.includes(searchQuery)
    const matchesCategory = selectedCategory === 'all' || report.type === selectedCategory
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-start items-center mb-8">
          <h1 className="text-2xl mr-10 font-bold">Reports History</h1>
          <p className="text-sm text-white bg-orange-500">FEATURE COMING SOON !!</p>
         
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Types</option>
              <option value="GPA">GPA</option>
              <option value="Module Grade">Module Grade</option>
            </select>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Courses</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Grade</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 text-sm">{report.type}</td>
                    <td className="px-6 py-4 text-sm">{report.date}</td>
                    <td className="px-6 py-4 text-sm">{report.courses}</td>
                    <td className="px-6 py-4 text-sm">{report.grade}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2 items-center">
                        {getStatusIcon(report.status)}
                        <button className="text-red-500 hover:text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
