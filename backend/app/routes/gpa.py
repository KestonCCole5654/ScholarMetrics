from flask import Blueprint, request, jsonify
from utils.gpaMethod import calculateGPA

gpaBp = Blueprint('gpa', __name__)

@gpaBp.route('/gpaCalculation', methods=['POST'])
def gpaCalculation():
    try:
        # Remove any trailing slashes or newlines
        request.path = request.path.rstrip()

        data = request.get_json()
        modules = data.get('modules', [])
        semester = data.get('semester')
        year = data.get('year')
        grades = data.get('grades', [])
        scale = data.get('scale', '4.0')

        # Calculate GPA
        calculated_gpa = calculateGPA(grades, scale=scale)

        return jsonify({
            'modules': modules,
            'grades': grades,
            'year': year,
            'semester': semester,
            'gpa': calculated_gpa,
            'message': 'GPA calculated successfully'
        }), 200

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500
