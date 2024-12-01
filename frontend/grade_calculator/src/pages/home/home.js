import { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import { ChevronDown, ChevronUp, Calculator, BookOpen, GraduationCap, LineChart, Clock, Calendar, Target, Settings } from 'lucide-react';

export default function WelcomePage() {
  const [openCalculator, setOpenCalculator] = useState(null);

  const calculators = [
    {
      id: 'gpa',
      name: 'GPA - Grade Point Average Calculator',
      description: 'Calculate your overall GPA based on your course grades and credit hours. Supports both weighted and unweighted GPA calculations.',
      link: '/gpa-calculator'
    },
    {
      id: 'weighted',
      name: 'WGC - Weighted Grade Calculator',
      description: 'Determine your final grade by factoring in the weight of different assignments, tests, and projects in your course.',
      link: '/weighted-grade'
    },
    {
      id: 'final',
      name: 'FGC - Final Grade Calculator',
      description: 'Predict your final grade based on your current grades and upcoming assignments. Plan what you need to achieve your desired grade.',
      link: '/final-grade'
    }
  ];

  const features = [
    {
      icon: <Calculator className="w-6 h-6 text-white" />,
      time: '2 min',
      name: 'GPA Calculation'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      time: '1 min',
      name: 'Course Tracking'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      time: '3 min',
      name: 'Grade Prediction'
    },
    {
      icon: <LineChart className="w-6 h-6 text-white" />,
      time: '2 min',
      name: 'Progress Analysis'
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      time: '1 min',
      name: 'Quick Results'
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      time: '2 min',
      name: 'Semester Planning'
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      time: '1 min',
      name: 'Goal Setting'
    },
    {
      icon: <Settings className="w-6 h-6 text-white" />,
      time: '2 min',
      name: 'Grade Weighting'
    }
  ];

  const toggleCalculator = (id) => {
    setOpenCalculator(openCalculator === id ? null : id);
  };

  return (
    <div className="min-h-screen text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            Welcome to ScholarMetrics. 
          </h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
            Select a Calculator Below to Get Started
          </button>
        </div>

        {/* Calculators Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Calculators We Offer</h2>
          <div className="bg-[#1a202c] rounded-md overflow-hidden">
            {calculators.map((calc, index) => (
              <div key={calc.id} className="border-b border-gray-800 last:border-b-0">
                <button 
                  onClick={() => toggleCalculator(calc.id)}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex justify-between items-center"
                >
                  {calc.name}
                  {openCalculator === calc.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openCalculator === calc.id && (
                  <div className="px-4 py-3 bg-[#1a202c] text-left text-white">
                    <p className="mb-4">{calc.description}</p>
                    <Link 
                      to={calc.link}
                      className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition-colors"
                    >
                      Use {calc.name.split('-')[0].trim()}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold">
              Grade calculation made simple,<br />
              fast and efficient.
            </h2>
            <p className="text-gray-400 text-lg">
              Get your results in minutes, not hours. Here's how quickly you can use our features:
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className=" p-4 bg-[#1a202c] rounded-xl space-y-4 hover:bg-[#2d3748] transition-colors"
              >
                <div className="flex  justify-between items-start">
                  {feature.icon}
                  <span className="text-orange-500 font-semibold">{feature.time}</span>
                </div>
                <div className="font-medium">{feature.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
