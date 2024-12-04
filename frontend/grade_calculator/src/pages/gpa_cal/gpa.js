import React, { useState } from "react";
import GPAImprovementPlanAPI from "../../components/GPAImprovementPlanAPI/plan1";
import GPACalculatorComponent from "../../components/gpacal/gpacal";
import CalculatorTabs from "../../components/Tabs/tabs";


export default function GPACalculator() {
   
    return (
        <div className="min-h-screen text-white px-4 py-8 md:px-6 md:py-12">
            <div className="max-w-4xl mx-auto space-y-6">

                <CalculatorTabs/>

            </div>
        </div>
    );
}
