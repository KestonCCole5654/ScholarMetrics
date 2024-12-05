import React, { useState } from 'react'
import { CreditCard, Calendar, Lock } from 'lucide-react'

export default function PaymentDetailsPage() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the payment details to your backend
    console.log('Payment details submitted:', formData)
    // After successful submission, you might want to redirect to a confirmation page
  }

  return (
    <div className="min-h-screen bg-gradient-to-b  text-white px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Payment Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-400 mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 pl-10"
                required
                pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}"
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-400 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-400 mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 pl-10"
                  required
                  pattern="\d{2}/\d{2}"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-400 mb-1">
                CVV
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 pl-10"
                  required
                  pattern="\d{3,4}"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-black font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-300 mt-6"
          >
            Pay Now
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400 text-center">
          Your payment information is securely processed and encrypted.
        </p>
      </div>
    </div>
  )
}

