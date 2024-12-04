import React, { useState} from "react";
import Header from "../../components/module_pg/Header/Header";
import UploadSection from "../../components/module_pg/UploadSection/uploadsection";
import AssessmentForm from "../../components/module_pg/AssessmentsForm/Form";

export default function ModuleGradeCalculator() {
    const [assessments, setAssessments] = useState([{ name: "", weight: 0, grade: "" }]);
    const [finalGrade, setFinalGrade] = useState(null);
    const [error, setError] = useState(null);
    

    return (
        <div className="min-h-screen text-white px-4 py-8 md:px-6 md:py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <Header />
                {error && (
                    <div className="bg-red-500 text-white p-4 rounded">
                        <p>Error: {error}</p>
                    </div>
                )}
                <UploadSection />
                <AssessmentForm 
                    assessments={assessments} 
                    setAssessments={setAssessments} 
                    finalGrade={finalGrade}  
                    setFinalGrade={setFinalGrade} 
                />
            </div>
        </div>
    );
}