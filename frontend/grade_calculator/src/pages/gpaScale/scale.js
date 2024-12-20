import { useState } from "react";
import React from "react";
import { TableOfContents } from "../../components/pages/gpaScale/Article/TOC/toc";
import { ExplanationSection } from "../../components/pages/gpaScale/Article/explanationSection/body";
import { GpaScaleTable } from "../../components/pages/gpaScale/Article/scaleTable/table";

export default function GpaScalePage() {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };


  return (
    <div className="min-h-screen text-left  ">
      <div className="container mx-auto font-custom  pt-6 pr-3 pl-3   max-w-6xl">
        
        <div className='flex items-left bg-blue-100 font-custom p-5 shadow-sm mb-5 rounded-lg'>
          
          <div className='flex-grow  text-left pr-6'>
            <h1 className="text-2xl font-bold text-left text-gray-800 mb-4">
              GPA Scales
            </h1>
            <p className="text-gray-600 text-left mb-4">
              Calculate your exact GPA using our free online GPA Calculator. Get your GPA instantly by entering the earned grade and credits for each course.
            </p>

            <button
              onClick={handleShareClick}
              className='bg-blue-200 hover:bg-blue-300 mr-5 text-blue-800 px-4 py-2  rounded-md text-sm'
            >
              {copied ? 'Copied!' : 'Share URL'}
            </button>



          </div>

          <div className='w-1/4'>
            <img
              src="/images/image1.jpg"
              alt="GPA Calculator"
              className='w-full h-auto rounded-lg'
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 border p-6 bg-white ">
            <section id="introduction"> 
              <p className="mb-4">
                Grade Point Average (GPA) is a standardized measurement of academic achievement in the United States.
                It's calculated by assigning point values to grades and then taking an average. Understanding GPA scales
                is crucial for students to gauge their academic performance and for institutions to evaluate students.
              </p>
            </section>
            <section id="gpa-scale-table">
              <h2 className="text-2xl font-semibold mb-4">GPA Scale Table</h2>
              <GpaScaleTable />
            </section>
            <ExplanationSection />
          </main>
          <aside className="lg:w-72 ">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>
  );
}
