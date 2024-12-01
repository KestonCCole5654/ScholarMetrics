import React from 'react'
import { Calculator, Users, Clock, Globe } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center mb-8">About GradePro</h1>
        
        <section className="bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">ScholarMetrics</h2>
          <p className="text-gray-300">
            At ScholarMetrics, we're committed to empowering students with powerful, easy-to-use tools for academic success. 
            Our goal is to simplify grade calculations, provide insightful analytics , and help students make informed 
            decisions about their academic journey.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: <Calculator className="w-8 h-8 text-orange-500" />, title: "Accurate Calculations", description: "Our advanced algorithms ensure precise grade calculations across various academic systems." },
            { icon: <Users className="w-8 h-8 text-orange-500" />, title: "User-Friendly", description: "Designed with students in mind, our interface is intuitive and easy to navigate." },
            { icon: <Clock className="w-8 h-8 text-orange-500" />, title: "Time-Saving", description: "Automate your grade calculations and spend more time on what matters - your studies." },
            { icon: <Globe className="w-8 h-8 text-orange-500" />, title: "Accessible Anywhere", description: "Access your grades and calculations from any device, anytime, anywhere." },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-4">{feature.title}</h3>
              </div>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </section>

        

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to take control of your grades?</h2>
          <a href="/calculators" className="inline-block bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-200">
            Try Our Calculators
          </a>
        </section>
      </div>
    </div>
  )
}

