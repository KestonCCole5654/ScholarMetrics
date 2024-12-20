import React from "react";
import FinalGradeCalculator from "../../components/pages/finalGrade/grade";


export default function GradeCalculator() {

    return (
        <div className="min-h-screen text-white px-4 py-8 md:px-6 md:py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <FinalGradeCalculator />
            </div>
        </div>
    );
}
