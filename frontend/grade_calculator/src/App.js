import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import routing components
import Login from './components/Login/login';
import Register from './components/Register/register';
import Layout from './components/Layout/layout';
import Home from './pages/home/home';
import GPACalculator from './pages/gpa_cal/gpa';
import ModuleGradeCalculator from './pages/module_cal/module';
import ReportsHistory from './pages/reports/reports';
import Calculators from './pages/calculators/calculators';
import Poster from './pages/poster/poster';
import ContactForm from './pages/contact/contact';
import About from './pages/about/about';
import scale from './pages/scale/scale';


function App() {
  return (
    <Router> {/* Wrapping my application in the Router tag */}
      <Routes> {/* Routes Tag */}
        {/* Define public routes for login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<Poster />} />

        {/* Authenticated Routes wrapped in Layout */}
        <Route path="/" element={<Layout />}>   
          {/* Explicit /home route */}
          <Route path="home" element={<Home />} /> 
          <Route path="gpa" element={<GPACalculator />} /> 
          <Route path="module" element={<ModuleGradeCalculator />} /> 
          <Route path="reports" element={<ReportsHistory />} /> 
          <Route path="calculators" element={<Calculators />} /> 
          <Route path="contact" element={<ContactForm />} /> 
          <Route path="about" element={<About />} /> 
          <Route path="scale" element={<scale />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
