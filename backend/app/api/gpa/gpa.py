# GPA calculation endpoint
@app.route('/calculate-gpa', methods=['POST'])
def calculate_gpa_endpoint():
    """
    Calculate GPA based on grades and scale.
    """
    data = request.get_json()
    grades = data.get('grades')
    scale = str(data.get('scale', "4.0"))  # Default to 4.0 scale

    if not grades:
        return jsonify({"error": "Grades are required"}), 400

    try:
        calculated_gpa = gpa(grades, scale)
        return jsonify({"gpa": calculated_gpa, "scale": scale}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# calculate grade upload endpoint
@app.route('/calculate-grade', methods=['POST'])
def calculate_grade():
    try:
        # Parse incoming JSON
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        # Validate the 'assessments' field
        assessments = data.get("assessments")
        if not isinstance(assessments, list) or len(assessments) == 0:
            return jsonify({"error": "Assessments must be a non-empty array"}), 400

        # Process grades
        total_weight = 0
        total_score = 0

        for assessment in assessments:
            weight = assessment.get("weight", 0)
            grade = assessment.get("grade")

            # Convert letter grades to numeric if necessary
            if isinstance(grade, str):  # If grade is a letter (e.g., "A+")
                grade = LETTER_GRADE_MAPPING.get(grade.upper())
                if grade is None:  # Invalid letter grade
                    return jsonify({"error": f"Invalid letter grade '{assessment.get('grade')}'"}), 400

            # Ensure numeric grades are valid
            try:
                grade = float(grade)
            except ValueError:
                return jsonify({"error": f"Invalid grade '{assessment.get('grade')}'"}), 400

            # Ensure the grade is within the valid range
            if not (0 <= grade <= 100):
                return jsonify({"error": f"Grade must be between 0 and 100, but got '{grade}'"}), 400

            total_weight += weight
            total_score += (weight * grade) / 100

        # Ensure weights sum to 100 (with some tolerance for rounding errors)
        if not (98 <= total_weight <= 102):
            return jsonify({"error": "Total weight must be added up 100"}), 400

        # Return the calculated grade, rounded to 2 decimal places for presentation
        return jsonify({"final_grade": round(total_score, 2)})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@app.route('/calculate', methods=['POST'])
def calculate_grades_api():
    data = request.json
    
    # Extract required data
    courses = data.get('courses', [])
    current_gpa = data.get('current_gpa', 0)
    desired_gpa = data.get('desired_gpa', 0)
    
    # Validate input
    if not courses or current_gpa <= 0 or desired_gpa <= 0:
        return jsonify({"error": "Invalid input data"}), 400
    
    try:
        # Calculate grade requirements
        result = calculate_grade_requirements(
            courses, 
            current_gpa, 
            desired_gpa
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

