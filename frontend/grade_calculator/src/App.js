import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import routing components
import Layout from './components/Layout/layout';
import GPACalculatorComponent from './components/pages/gpaCalculator/gpacal';
import Blogs from './components/pages/Blogs/blogs';
import GpaScalePage from './pages/gpaScale/scale';
import GradeCalculatorComponent from './components/pages/gradeCalculator/gradeCalculator';
import BlogPage from './components/pages/Blogs/blogs';
import GPAImprovementCalculator from './components/pages/raiseGpa/raisegpa';
import MidtermCalculator from './components/pages/midterm/midterm';
import FinalGradeCalculator from './components/pages/finalGrade/grade';

function App() {
  return (
    <Router> {/* Wrapping my application in the Router tag */}
      <Routes> {/* Routes Tag */}
        <Route path="/" element={<Layout />}>   
          {/* Explicit /home route */}
          <Route path='gpa-calculator' element={<GPACalculatorComponent />} />          
          <Route path='blogs' element={<Blogs />} />  
          <Route path='scale' element={<GpaScalePage />} />  
          <Route path='grade-calculator' element={<GradeCalculatorComponent />} />  
          <Route path='blogs' element={<BlogPage />} />  
          <Route path='raise-gpa' element={<GPAImprovementCalculator />} />  
          <Route path='midterm-calculator' element={<MidtermCalculator />} />  
          <Route path='finalgrade-calculator' element={<FinalGradeCalculator />} />  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
