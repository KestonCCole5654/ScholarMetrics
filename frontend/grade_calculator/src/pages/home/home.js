import { useState , useEffect} from 'react'
import { handleLogout } from '../../utils/authHandlers/authHandlers';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Calculator, BookOpen, GraduationCap, LineChart, Clock, Calendar, Target, Settings } from 'lucide-react'

export default function WelcomePage() {
  const [number, setNumber] = useState(0); // Initialize 'number'
  const [openCalculator, setOpenCalculator] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();



   // Check login status on component mount
   useEffect(() => {
    // Check if there's a token in localStorage or your preferred auth method
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const onLogout = () => {
    // Call your logout handler
    handleLogout(navigate);
    // Update login state
    setIsLoggedIn(false);
  };




  const calculators = [
    {
      id: 'gpa',
      name: 'GPA - Grade Point Average Calculator',
      description: 'Calculate your overall GPA based on your course grades and credit hours. Supports both weighted and unweighted GPA calculations.',
      link: '/gpa'
    },
    {
      id: 'weighted',
      name: 'WGC - Weighted Grade Calculator',
      description: 'Determine your final grade by factoring in the weight of different assignments, tests, and projects in your course.',
      link: '/module'
    }
  ]

  const features = [
    {
      icon: <Calculator className="w-6 h-6 text-white" />,
      time: 'Available',
      name: 'GPA Calculation'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      time: 'Coming Soon',
      name: 'Course Tracking'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      time: 'Coming Soon',
      name: 'Grade Prediction'
    },
    {
      icon: <LineChart className="w-6 h-6 text-white" />,
      time: 'Availble',
      name: 'Course Outline Upload  '
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      time: 'Available',
      name: 'Calculator Reports'
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      time: 'Coming Soon',
      name: 'Semester Planning'
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      time: 'Available',
      name: 'Module Grade Calculator'
    },
    {
      icon: <Settings className="w-6 h-6 text-white" />,
      time: 'Coming Soon',
      name: 'Credit Management'
    }
  ]

  const toggleCalculator = (id) => {
    setOpenCalculator(openCalculator === id ? null : id)
  }

  return (
    <div className="min-h-screen  text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            Hey there, Welcome. <br/> What are you Calculating Today ? 
          </h1>
          <br/>
          <button className="bg-orange-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors">
            Select a Calculator Below to Get Started
          </button>
        </div>

        {/* Calculators Section */}
        <div className="space-y-4">
          <div className="bg-[#1a202c] rounded-md overflow-hidden">
            {calculators.map((calc, index) => (
              <div key={calc.id} className="border-b border-gray-900  last:border-b-0">
                <button 
                  onClick={() => toggleCalculator(calc.id)}
                  className="w-full px-4 py-3 text-left text-white transition-colors flex justify-between items-center"
                >
                  {calc.name}
                  {openCalculator === calc.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {openCalculator === calc.id && (
                  <div className="px-4 py-3 text-left bg-[#1a202c] text-white">
                    <p className="mb-4">{calc.description}</p>
                    <a 
                      href={calc.link}
                      className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-md transition-colors"
                    >
                      Use {calc.name.split('-')[0].trim()}
                    </a>
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
              Get your results in minutes, not hours. Here's how some of our features:
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-[#1a202c] p-4 rounded-xl space-y-4 hover:bg-[#2d3748] transition-colors"
              >
                <div className="flex justify-between items-start">
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
  )
}

