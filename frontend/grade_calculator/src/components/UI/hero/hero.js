import React, { useState } from 'react';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 bg-blue-100 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          College GPA Calculator
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-grow space-y-4">
            <p className="text-gray-600">
              Calculate your exact GPA using our free online GPA Calculator. Get your GPA instantly by entering the earned grade and credits for each course.
            </p>
            <button
              onClick={handleShareClick}
              className="w-full sm:w-auto px-4 py-2 bg-blue-200 hover:bg-blue-300 text-blue-800 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              {copied ? 'Copied!' : 'Share Calculator'}
            </button>
          </div>
          <div className="w-full md:w-1/3 aspect-video relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="/images/image1.jpg"
              alt="GPA Calculator"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

