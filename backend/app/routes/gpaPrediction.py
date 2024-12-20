from flask import Blueprint, request, jsonify
from utils.gpaPredictionMethod import calculate_required_grades

gpaPrediction_Bp = Blueprint('gpaPrediction', __name__)

@gpaPrediction_Bp.route('/gpaPrediction', methods=['POST'])
def calculate_gpa():
    try:
        data = request.get_json()
        
        # Validate input data
        required_fields = ['courses', 'current_gpa', 'desired_gpa', 'gpa_scale']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Call the utility function
        result = calculate_required_grades(
            current_gpa=data['current_gpa'],
            desired_gpa=data['desired_gpa'],
            courses=data['courses'],
            gpa_scale=data['gpa_scale']
        )
        
        return jsonify(result)
    
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred', 'details': str(e)}), 500