import numpy as np
from typing import List, Dict, Any

def calculate_required_grades(current_gpa: float, desired_gpa: float, courses: List[Dict], gpa_scale: float = 4.0) -> Dict[str, Any]:
    """
    Calculate the grades needed for each module to achieve the desired GPA.
    
    :param current_gpa: Current GPA
    :param desired_gpa: Target GPA
    :param courses: List of courses with their current credits
    :param gpa_scale: GPA scale (4.0, 4.3, or 5.0)
    :return: Dictionary with required grades and additional information
    """
    # Grade point mappings
    grade_points = {
        '4.0': {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'F': 0.0
        }
    }

    # Validate inputs
    if not (0 <= current_gpa <= gpa_scale):
        raise ValueError(f"Current GPA must be between 0 and {gpa_scale}")
    if not (0 <= desired_gpa <= gpa_scale):
        raise ValueError(f"Desired GPA must be between 0 and {gpa_scale}")

    # Calculate current total credits and grade points
    total_credits = sum(course['credits'] for course in courses)
    current_total_points = current_gpa * total_credits

    # Calculate total points needed for desired GPA
    total_desired_points = desired_gpa * total_credits

    # Calculate points needed
    points_needed = total_desired_points - current_total_points

    # Detailed grade point mapping
    grades_map = [
        ('A+', 4.0), ('A', 4.0), ('A-', 3.7),
        ('B+', 3.3), ('B', 3.0), ('B-', 2.7),
        ('C+', 2.3), ('C', 2.0), ('C-', 1.7),
        ('D+', 1.3), ('D', 1.0), ('F', 0.0)
    ]

    # Function to find optimal grade
    def find_optimal_grade(points_per_credit):
        for grade, points in grades_map:
            if points >= points_per_credit:
                return grade
        return 'F'

    # Calculate required grades for each module
    module_grades = []
    remaining_points = points_needed

    # Sort courses by credits in descending order
    sorted_courses = sorted(courses, key=lambda x: x['credits'], reverse=True)

    for course in sorted_courses:
        # Calculate points needed per credit for this course
        points_per_credit = remaining_points / total_credits
        
        # Find the optimal grade
        required_grade = find_optimal_grade(points_per_credit)
        
        # Get the grade points for the required grade
        grade_point = dict(grades_map)[required_grade]
        
        # Calculate points contributed by this course
        course_points = grade_point * course['credits']
        
        module_grades.append({
            'name': course['name'],
            'credits': course['credits'],
            'required_grade': required_grade
        })
        
        # Update remaining points
        remaining_points -= course_points

    return {
        'current_gpa': current_gpa,
        'desired_gpa': desired_gpa,
        'gpa_scale': gpa_scale,
        'total_credits': total_credits,
        'module_grades': module_grades,
        'explanation': f"To improve from {current_gpa} to {desired_gpa}, focus on achieving the suggested grades for each module."
    }