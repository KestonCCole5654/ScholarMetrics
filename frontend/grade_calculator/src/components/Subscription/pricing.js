import React from 'react'
import { Check } from 'lucide-react'

const PlanCard = ({ name, price, features, isPopular }) => (
  <div className={`bg-gray-900 rounded-lg p-6 ${isPopular ? 'border-2 border-orange-500' : ''}`}>
    {isPopular && (
      <span className="bg-orange-500 text-black text-xs font-semibold px-2 py-1 rounded-full uppercase mb-2 inline-block">
        Most Popular
      </span>
    )}
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-3xl font-bold mb-4">${price}<span className="text-sm font-normal">/ 6 month</span></p>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <a href='/page'>
      <button className="w-full bg-orange-500 text-black font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
        Choose Plan
      </button>
    </a>

  </div>
)

const FAQ = ({ question, answer }) => (
  <div className="mb-4">
    <h4 className="text-lg font-semibold mb-2">{question}</h4>
    <p className="text-gray-400">{answer}</p>
  </div>
)

export default function SubscriptionPage() {
  const plans = [
    {
      name: "Free Plan",
      price: 0.00,
      features: [
        "Unlimited GPA calculations",
        "Custom GPA scales",
        "Basic analytics",
        "Email support"
      ],
      isPopular: false
    },
    {
      name: "Pro Plan",
      price: 5.99,
      features: [
        "All Basic Plan features",
        "Advanced analytics",
        "Grade improvement suggestions",
        "Priority support",
        "Ad-free experience"
      ],
      isPopular: true
    }
  ]

  const faqs = [
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
    },
    {
      question: "Is there a free trial available?",
      answer: "We offer a 7-day free trial for both our Basic and Pro plans. You can try out all the features before committing to a subscription."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay for subscription payments."
    }
  ]

  return (
    <div className="min-h-screen text-left bg-gradient-to-b  text-white px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-gray-400">Select the perfect plan to boost your academic success</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <FAQ key={index} {...faq} />
          ))}
        </div>
      </div>
    </div>
  )
}

