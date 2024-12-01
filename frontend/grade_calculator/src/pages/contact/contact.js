import React, { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, message })
    setSubmitted(true)
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Contact Us</h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            We'd love to hear from you. Please fill out this form and we'll get back to you as soon as possible.
          </p>
        </div>
        {submitted ? (
          <div className="rounded-md bg-green-500 p-4">
            <p className="text-center text-white">Thank you for your message. We'll get back to you soon!</p>
          </div>
        ) : (
          <form className="mt-8  space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Your message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Send className="h-5 w-5 text-orange-500 group-hover:text-orange-400" aria-hidden="true" />
                </span>
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

