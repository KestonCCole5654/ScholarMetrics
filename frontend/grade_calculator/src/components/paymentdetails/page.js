"use client"

import React, { useState } from 'react'
import { Check } from 'lucide-react'

export default function PaymentDetailsPage() {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    hasPromoCode: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle payment submission
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-6 items-start">
        {/* Left Side - Payment Form */}
        <div className=" p-6   rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Payment details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border outline-none bg-gray-800 rounded-lg "
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm text-gray-600 mb-1">
                Credit Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border outline-none bg-gray-800 rounded-lg"
                placeholder="xxxx xxxx xxxx xxxx"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm text-gray-600 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border outline-none bg-gray-800 rounded-lg"
                  placeholder="mm / yy"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm text-gray-600 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border outline-none bg-gray-800 rounded-lg"
                  placeholder="xxx"
                />
              </div>
            </div>

            
           

            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">$96</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium">$4</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-2 border-t">
                <span>Total Amount</span>
                <span>$100</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Make payment
            </button>
          </form>
        </div>

        {/* Right Side - Plan Details */}
        <div className="bg-gradient-to-br  text-white p-8 rounded-lg">
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">
                Subscribe and start saving your money today!
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg"></div>
                <div>
                  <h3 className="font-medium">Professional Plan</h3>
                  <p className="text-lg font-semibold">$96 / month</p>
                </div>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>All features in basic included</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Easy and flexible business with invoice management</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Full time customer support</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>20 TB cloud storage</span>
              </li>
            </ul>

            <button className="text-blue-400 hover:text-blue-300 text-sm">
              Modify plan
            </button>

            {/* Success Message Overlay - Toggle this based on payment success */}
            {false && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white text-gray-900 p-6 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg font-medium">Your payment was successful!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

