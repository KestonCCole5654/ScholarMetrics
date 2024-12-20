export function ExplanationSection() {
    return (
      <section id="explanations" className="mt-8 text-left space-y-8">
        <h2 className="text-2xl font-semibold mb-4">GPA Scale Explanations</h2>
        
        <div id="4-0-scale" className="space-y-2">
          <h3 className="text-xl font-semibold mb-2">4.0 Scale</h3>
          <p className="mb-2">
            The 4.0 scale is the most common GPA scale used in the United States. On this scale:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>4.0 is the highest possible GPA, typically corresponding to an A or A+</li>
            <li>3.0 corresponds to a B</li>
            <li>2.0 corresponds to a C</li>
            <li>1.0 corresponds to a D</li>
            <li>0.0 corresponds to an F</li>
          </ul>
          <p>
            This scale allows for more nuanced grading with plus and minus grades (e.g., B+ = 3.3, B- = 2.7).
          </p>
        </div>
        
        <div id="5-0-scale" className="space-y-2">
          <h3 className="text-xl font-semibold mb-2">5.0 Scale</h3>
          <p className="mb-2">
            The 5.0 scale is less common but is sometimes used, especially for weighted GPAs in high schools with honors or AP courses. On this scale:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>5.0 is the highest possible GPA, typically for an A+ in an advanced course</li>
            <li>4.0 might correspond to an A in a standard course or a B in an advanced course</li>
            <li>3.0 might correspond to a B in a standard course or a C in an advanced course</li>
          </ul>
          <p>
            This scale allows schools to give extra weight to more challenging courses, potentially resulting in GPAs above 4.0.
          </p>
        </div>
        
        <div id="100-point-scale" className="space-y-2">
          <h3 className="text-xl font-semibold mb-2">100-Point Scale</h3>
          <p className="mb-2">
            The 100-point scale is a percentage-based system often used for individual assignments or tests. On this scale:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>90-100 typically corresponds to an A</li>
            <li>80-89 typically corresponds to a B</li>
            <li>70-79 typically corresponds to a C</li>
            <li>60-69 typically corresponds to a D</li>
            <li>0-59 typically corresponds to an F</li>
          </ul>
          <p>
            This scale is intuitive for many students and teachers, as it directly represents the percentage of correct answers or points earned.
          </p>
        </div>
        
        <p className="mt-4">
          Understanding these different GPA scales is important for students, especially when comparing grades across different institutions or when applying to colleges. Always check with your specific institution to understand which scale they use and how they calculate GPAs.
        </p>
      </section>
    )
  }
  
  