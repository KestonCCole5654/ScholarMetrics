import React from "react";
import GPACalculatorComponent from "../../components/pages/gpaCalculator/gpacal";


export default function GPACalculator() {

    return (
        <div className="min-h-screen text-white px-4 py-8 md:px-6 md:py-12">
            <div className="max-w-4xl mx-auto space-y-6">
                <GPACalculatorComponent />
            </div>
        </div>
    );
}
