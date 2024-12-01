'use client'

import React from 'react'
import { Calculator, BookOpen, BarChart, PieChart, TrendingUp, Percent } from 'lucide-react'

const calculators = [
  {
    name: 'GPA Calculator',
    description: 'Calculate your Grade Point Average',
    icon: <Calculator className="w-8 h-8" />,
    link: '/gpa'
  },
  {
    name: 'Module Grade Calculator',
    description: 'Calculate individual module grades',
    icon: <BookOpen className="w-8 h-8" />,
    link: '/module'
  }
]

export default function Calculators() {
  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-left">Calculators</h1>
        <p className="text-lg font-medium  mb-10 text-left">Select a calculator of choice </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc, index) => (
            <a href={calc.link} key={index} className="block">
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500 rounded-full p-3 mr-4">
                    {calc.icon}
                  </div>
                  <h2 className="text-xl font-semibold">{calc.name}</h2>
                </div>
                <p className="text-gray-400 mb-4 flex-grow">{calc.description}</p>
                <div className="text-orange-500 font-semibold flex items-center">
                  Use Calculator
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

