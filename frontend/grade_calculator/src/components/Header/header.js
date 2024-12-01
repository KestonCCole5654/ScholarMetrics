import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../utils/authHandlers/authHandlers';

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const onLogout = () => {
    handleLogout(navigate);
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#1a202c] shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              ScholarMetrics
            </span>
          </div>

          {/* Hamburger Menu */}
          <button
            className="text-gray-600 dark:text-gray-300 md:hidden focus:outline-none"
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
            <a href="/home" className="text-gray-300 hover:text-orange-500">Home</a>
            <a href="/calculators" className="text-gray-300 hover:text-orange-500">Calculators</a>
            <a href="/reports" className="text-gray-300 hover:text-orange-500">Reports</a>
            <a href="/about" className="text-gray-300 hover:text-orange-500">About</a>
            <a href="/contact" className="text-gray-300 hover:text-orange-500">Contact</a>
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden md:flex space-x-4">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"
                  onClick={toggleDropdown}
                ></button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Settings
                    </a>
                    <button
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
                >
                  Log in
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50"
                >
                  Sign up
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          ref={mobileMenuRef} 
          className={`md:hidden mt-4 bg-gray-800 rounded-md shadow-lg py-2 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <a href="/home" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Home</a>
          <a href="/calculators" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Calculators</a>
          <a href="/reports" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Reports</a>
          <a href="/about" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">About</a>
          <a href="/contact" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Contact</a>
          {isLoggedIn ? (
            <>
              <a href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Settings</a>
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Log in</a>
              <a href="/register" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Sign up</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;