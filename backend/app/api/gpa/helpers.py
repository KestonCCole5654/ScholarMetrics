from typing import List, Dict, Union

LETTER_GRADE_MAPPING = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0
}

def letter_to_grade_point(letter: str) -> float:
    return LETTER_GRADE_MAPPING.get(letter, None)

def grade_point_to_letter(grade_point: float) -> str:
    if grade_point >= 4.0:
        return "A+"
    elif grade_point >= 3.7:
        return "A-"
    elif grade_point >= 3.3:
        return "B+"
    elif grade_point >= 3.0:
        return "B"
    elif grade_point >= 2.7:
        return "B-"
    elif grade_point >= 2.3:
        return "C+"
    elif grade_point >= 2.0:
        return "C"
    elif grade_point >= 1.7:
        return "C-"
    elif grade_point >= 1.3:
        return "D+"
    elif grade_point >= 1.0:
        return "D"
    elif grade_point >= 0.7:
        return "D-"
    else:
        return "F"

def calculate_gpa(courses: List[Dict[str, any]]) -> float:
    graded_courses = [course for course in courses if 'grade' in course and course['grade']]
    if not graded_courses:
        return 0.0
    
    total_credits = sum(course['credits'] for course in graded_courses)
    total_grade_points = sum(
        letter_to_grade_point(course['grade']) * course['credits'] 
        for course in graded_courses
    )
    
    return total_grade_points / total_credits if total_credits > 0 else 0

def calculate_grade_requirements(
    courses: List[Dict[str, any]], 
    current_gpa: float, 
    desired_gpa: float
) -> Union[str, List[Dict[str, any]]]:
    graded_courses = [course for course in courses if 'grade' in course and course['grade']]
    ungraded_courses = [course for course in courses if 'grade' not in course or not course['grade']]
    
    total_credits = sum(course['credits'] for course in courses)
    current_grade_points = current_gpa * sum(course['credits'] for course in graded_courses)
    total_grade_points_required = desired_gpa * total_credits
    additional_grade_points = total_grade_points_required - current_grade_points
    
    if additional_grade_points <= 0:
        return "The desired GPA is lower than or equal to the current GPA. No changes are needed."
    
    course_requirements = []
    remaining_points = additional_grade_points
    
    for course in ungraded_courses:
        max_possible_grade_point = 4.0
        min_possible_grade_point = max(
            letter_to_grade_point('C'),  
            (remaining_points / course['credits']) + letter_to_grade_point('C')
        )
        
        remaining_points -= (max_possible_grade_point - min_possible_grade_point) * course['credits']
        
        course_requirements.append({
            "name": course['name'],
            "credits": course['credits'],
            "lowest_required_grade": grade_point_to_letter(min_possible_grade_point),
            "highest_required_grade": grade_point_to_letter(max_possible_grade_point)
        })
    
    return {
        "current_gpa": current_gpa,
        "desired_gpa": desired_gpa,
        "course_requirements": course_requirements
    }
