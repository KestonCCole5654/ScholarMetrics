'use client'

import React from 'react';
import { ArrowRight } from 'lucide-react'

export default function Poster() {
  const stats = [
    { label: 'Students', value: '50k+' },
    { label: 'Universities', value: '100+' },
  ]

  const locations = [
    { name: 'New York', x: '20%', y: '35%' },
    { name: 'London', x: '45%', y: '25%' },
    { name: 'Tokyo', x: '80%', y: '35%' },
    { name: 'Sydney', x: '85%', y: '75%' },
  ]

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />

      {/* Main Content */}
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 max-w-7xl">
        {/* Header */}
        <nav className="flex justify-between items-center mb-8 lg:mb-16">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="text-xl font-bold">ScholarMetrics</span>
          </div>
          <button className="bg-orange-500 hover:bg-orange-400 px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors">
            <a href="/home" className="flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </button>
        </nav>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-center">
            Ultimate <span className="text-gray-400">Grade</span> Calculator
            <br />
            with <span className="text-orange-500">ScholarMetrics</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 text-center">
            Calculate your GPA instantly, track your academic progress, and achieve your educational goals with precision.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-orange-500 hover:bg-orange-400 px-8 py-3 rounded-full font-medium transition-colors">
              <a href="/home" className="flex items-center justify-center gap-2">
                Try Calculator <ArrowRight className="w-4 h-4" />
              </a>
            </button>
            <button className="border border-gray-700 hover:border-orange-500 px-8 py-3 rounded-full font-medium transition-colors">
              Watch Tutorial
            </button>
          </div>
        </div>


        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-8 max-w-xs mx-auto mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Map */}
        <div className="relative h-[300px] sm:h-[400px] mb-16">
          {/* World Map Dots */}
          <div className="absolute inset-0 grid grid-cols-12 gap-2 sm:gap-4">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-700 rounded-full" />
            ))}
          </div>

          {/* Location Markers */}
          {locations.map((location, index) => (
            <div
              key={index}
              className="absolute w-3 h-3"
              style={{ left: location.x, top: location.y }}
            >
              <div className="w-full h-full bg-orange-500 rounded-full animate-ping" />
              <div className="absolute inset-0 w-full h-full bg-orange-500 rounded-full" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-400">
                {location.name}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400">
          <p className="mb-4">Trusted by students worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {['MIT', 'Stanford', 'Harvard', 'Oxford'].map((uni, index) => (
              <div key={index} className="text-sm font-medium">{uni}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

