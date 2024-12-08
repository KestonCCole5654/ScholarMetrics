from flask import Blueprint, request, jsonify
from utils.moduleMethod import calculate_final_grade


moduleBp = Blueprint('module', __name__)

@moduleBp.route('/moduleCalculation', methods=['POST'])
def moduleCalculation():
    try: 
        data = request.get_json()
        assessments = data.get('assessments', [])
        grades = data.get('grades', [])
        
        # Ensure we have matching assessments and grades
        if len(assessments) != len(grades):
            return jsonify({
                'error': 'Number of assessments and grades must match'
            }), 400
        
        # Prepare grades and weights for calculation
        grades_and_weights = [(grade['grade'], assessment['weight']) for assessment, grade in zip(assessments, grades)]
        
        # Calculate the final grade
        finalGrade = calculate_final_grade(grades_and_weights)
        
        return jsonify({
            'finalGrade': finalGrade
        }), 200
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 400