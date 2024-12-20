import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white font-custom border-b border-gray-200 shadow-sm">
      <div className="container mx-auto py-2 md:py-4">
        <div className="flex items-center max-w-6xl mx-auto justify-between px-4">
          {/* Logo */}
          <a href='/gpa'>
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#0A65CC]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="text-lg md:text-xl font-custom font-bold text-[#18191C]">
                Scholar Calculators
              </span>
            </div>
          </a>

          {/* Hamburger Menu */}
          <button
            className="text-gray-600 md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {/* GPA Calculators Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
                className='text-[#18191C] rounded-md text-sm font-medium flex items-center'
              >
                GPA Calculators
                <svg
                  className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${isDropdownOpen1 ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isDropdownOpen1 && (
                <div className='absolute left-0 mt-2 w-48 bg-white rounded-sm shadow-lg py-1 z-50'>
                  <a href="/gpa-calculator" className="block px-4 py-2 text-sm hover:bg-gray-100 border-b text-[#18191C]">College Calculator</a>
                  <a href="/raisegpa-calculator" className="block px-4 py-2 text-sm hover:bg-gray-100 text-[#18191C]">Raise GPA Calculator</a>
                </div>
              )}
            </div>

            {/* Grade Calculators Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                className='text-[#18191C] rounded-md text-sm font-medium flex items-center'
              >
                Grade Calculators
                <svg
                  className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${isDropdownOpen2 ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isDropdownOpen2 && (
                <div className='absolute left-0 mt-2 w-48 bg-white rounded-sm shadow-lg py-1 z-50'>
                  <a href="/grade-calculator" className="block px-4 py-2 text-sm hover:bg-gray-100 border-b text-[#18191C]">Grade Calculator</a>
                  <a href="/final-gradecalculator" className="block px-4 py-2 text-sm hover:bg-gray-100 border-b text-[#18191C]">Final Grade Calculator</a>
                  <a href="/midterm-calculator" className="block px-4 py-2 text-sm hover:bg-gray-100 text-[#18191C]">Midterm Grade Calculator</a>
                </div>
              )}
            </div>

            <a href="/scale" className="text-[#18191C] rounded-md text-sm font-medium flex items-center">GPA Scale</a>
            <a href="/blogs" className="text-[#18191C] rounded-md text-sm font-medium flex items-center">Blogs</a>
            <a href="/about" className="text-[#18191C] rounded-md text-sm font-medium flex items-center">FAQ</a>
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden mt-4 bg-white border border-gray-200 rounded-lg shadow-lg py-2 absolute left-4 right-4 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col">
            {/* GPA Calculators Dropdown */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
                className="flex items-center justify-between w-full text-[#18191C]"
              >
                <span>GPA Calculators</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${isDropdownOpen1 ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropdownOpen1 && (
                <div className="pl-4 mt-2">
                  <a href="/gpa-calculator" className="block py-2 text-sm text-gray-600 hover:text-gray-900">College Calculator</a>
                  <a href="/raisegpa-calculator" className="block py-2 text-sm text-gray-600 hover:text-gray-900">Raise GPA Calculator</a>
                </div>
              )}
            </div>

            {/* Grade Calculators Dropdown */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                className="flex items-center justify-between w-full text-[#18191C]"
              >
                <span>Grade Calculators</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${isDropdownOpen2 ? 'rotate-180' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropdownOpen2 && (
                <div className="pl-4 mt-2">
                  <a href="/grade-calculator" className="block py-2 text-sm text-gray-600 hover:text-gray-900">Grade Calculator</a>
                  <a href="/final-gradecalculator" className="block py-2 text-sm text-gray-600 hover:text-gray-900">Final Grade Calculator</a>
                  <a href="/midterm-calculator" className="block py-2 text-sm text-gray-600 hover:text-gray-900">Midterm Grade Calculator</a>
                </div>
              )}
            </div>

            <a href="/scale" className="px-4 py-2 text-[#18191C] hover:bg-gray-100">GPA Scale</a>
            <a href="/blogs" className="px-4 py-2 text-[#18191C] hover:bg-gray-100">Blogs</a>
            <a href="/about" className="px-4 py-2 text-[#18191C] hover:bg-gray-100">FAQ</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;