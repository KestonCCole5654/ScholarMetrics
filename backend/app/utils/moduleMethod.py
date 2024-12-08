

# In your main app file
from config import GPA_SCALES  # Ensure this import is available if you use it elsewhere

def calculate_final_grade(grades_and_weights):
    """
    Calculate the final grade for a module based on grades and weights.

    :param grades_and_weights: List of tuples (grade, weight) for the module
    :return: The weighted average grade for the module
    """
    total_weight = 0
    weighted_sum = 0
    
    for grade, weight in grades_and_weights:
        weighted_sum += grade * weight
        total_weight += weight
    
    if total_weight == 0:
        return 0.0
    
    final_grade = weighted_sum / total_weight
    return final_grade