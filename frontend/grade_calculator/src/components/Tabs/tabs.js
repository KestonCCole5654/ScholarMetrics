import React, { useState } from 'react';
import GPAImprovementPlanAPI from '../GPAImprovementPlanAPI/plan1';
import GPAImprovementPlan from '../GPAImprovementPlan/plan';
import GPACalculatorComponent from '../gpacal/gpacal';

const CalculatorTabs = () => {
  const [activeTab, setActiveTab] = useState('calculator');

  const tabStyle = (tab) => 
    `px-4 py-2 text-sm font-medium transition-colors duration-200 ${
      activeTab === tab 
        ? 'bg-orange-500 text-black' 
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
    }`;

  return (
    <div className=" text-white">
          <h2 className='font-bold text-3xl mb-5'>  Choose A GPA Calculator </h2>
          <h3 className='text-lg text-gray-400 mb-10'>  Select a calcuator tab below,  for a sepcific calcuator tab to be displayed </h3>
      <div className="flex justify-center mb-4">
      
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button 
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`${tabStyle('calculator')} rounded-l-lg border border-gray-700`}
          >
            GPA Calculator
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('improvement')}
            className={`${tabStyle('improvement')} border-t border-b border-r border-gray-700 rounded-r-lg`}
          >
            GPA Improvement Plan
          </button>
        </div>
      </div>

      <div>
        {activeTab === 'calculator' ? (
          <GPACalculatorComponent />
        ) : (
          <GPAImprovementPlanAPI />
        )}
      </div>
    </div>
  );
};

export default CalculatorTabs;