# GPA Scales
GPA_SCALES = {
    "4.0": {
        "A": 4.0,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "C-": 1.7,
        "D+": 1.3,
        "D": 1.0,
        "D-": 0.7,
        "F": 0.0
    },
    "4.3": {
        "A+": 4.3,
        "A": 4.0,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "C-": 1.7,
        "D+": 1.3,
        "D": 1.0,
        "D-": 0.7,
        "F": 0.0
    },
    
    "5.0": {
        "A+": 5.0,
        "A": 4.0,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "C-": 1.7,
        "D+": 1.3,
        "D": 1.0,
        "D-": 0.7,
        "F": 0.0
    }
}

def gpa(grades, scale="4.0"):
    """
    Calculate GPA using the specified GPA scale
    
    :param grades: List of tuples (grade, credits)
    :param scale: GPA scale to use (default is "4.0")
    :return: Calculated GPA
    """
    # Validate the scale
    if scale not in GPA_SCALES:
        raise ValueError(f"Invalid GPA scale: {scale}. Available scales: {list(GPA_SCALES.keys())}")
    
    # Use the selected scale
    gpa_scale = GPA_SCALES[scale]
    
    total_points = 0
    total_credits = 0

    for grade, credit in grades:
        if grade not in gpa_scale:
            raise ValueError(f"Invalid grade: {grade} for the selected {scale} scale")
        
        grade_point = gpa_scale[grade]
        total_points += grade_point * credit
        total_credits += credit

    if total_credits == 0:
        raise ValueError("Total credits cannot be zero.")

    return round(total_points / total_credits, 2)