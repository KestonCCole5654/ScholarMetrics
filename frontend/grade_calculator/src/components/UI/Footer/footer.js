import React from 'react'


export function Footer() {
  return (
    <footer className="bg-white font-custom border-t border-gray-200 text-[#18191C] ">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm  text-[#18191C] ">
              © {new Date().getFullYear()} Grade Calculator. All rights reserved.
            </p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/privacy" className="text-sm text-[#18191C] hover:text-indigo-600  dark:hover:text-indigo-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm text-[#18191C] hover:text-indigo-600  dark:hover:text-indigo-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-[#18191C] hover:text-indigo-600  dark:hover:text-indigo-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer; 

