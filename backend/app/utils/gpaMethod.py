# GPA Scales
from config import GPA_SCALES


def calculateGPA(grades, scale="4.0"):
    """
    Calculate GPA using the specified GPA scale
    
    :param grades: List of tuples (grade, credits)
    :param scale: Predefined GPA scale to use (default is "4.0")
    :return: Calculated GPA
    """
    # Check if the provided scale is valid
    if scale not in GPA_SCALES:
        raise ValueError(f"Invalid GPA scale: {scale}. Available scales: {list(GPA_SCALES.keys())}")
    
    gpa_scale = GPA_SCALES[scale]
    
    total_points = 0
    total_credits = 0

    for grade, credit in grades:
        if grade not in gpa_scale:
            raise ValueError(f"Invalid grade: {grade} for the selected scale")
        
        grade_point = gpa_scale[grade]
        total_points += grade_point * credit
        total_credits += credit

    if total_credits == 0:
        raise ValueError("Total credits cannot be zero.")

    return round(total_points / total_credits, 2)
