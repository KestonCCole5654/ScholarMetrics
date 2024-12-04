
import os
from typing import List, Dict, Union
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from flask_cors import CORS
from api.gpa import gpa
import pandas as pd
from datetime import datetime


# Load environment variables from .env file
load_dotenv()

# Configuration class for centralized settings
class Config:
    # Secret keys and database configurations
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_here')  # Fallback for development
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI', 'mysql+pymysql://root:kestonCole123@localhost:3306/grade_calculator')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret_key')

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)  # Apply configurations
CORS(app)  # Enable CORS for all domains (restrict in production as needed)


# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Define the User model for managing user data
class User(db.Model):
    __tablename__ = 'users'  # Optional: explicitly define table name
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)

# Define a mapping for letter grades to numeric equivalents
LETTER_GRADE_MAPPING = {
    "A+": 97,
    "A": 93,
    "A-": 90,
    "B+": 87,
    "B": 83,
    "B-": 80,
    "C+": 77,
    "C": 73,
    "C-": 70,
    "D+": 67,
    "D": 63,
    "D-": 60,
    "F": 0
}

# Health check endpoint
@app.route('/', methods=['GET'])
def health_check():
    """
    Health check endpoint to verify API is running.
    """
    return jsonify({
        "Backend": "StudentMetrics",
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }), 200

# User registration endpoint
@app.route('/register', methods=['POST'])
def user_register():
    """
    Register a new user.
    """
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if user already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message": "User already exists!"}), 400

    # Register new user
    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User Registered Successfully"}), 201

# User login endpoint
@app.route('/login', methods=['POST'])
def login():
    """
    Authenticate user and return an access token.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid username or password"}), 401

    # Generate JWT access token
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token, "username": username}), 200

# Protected route requiring JWT authentication
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    """
    Example protected route that requires authentication.
    """
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message": "User not found!"}), 404
    return jsonify({"message": f"Welcome, {user.username}!"}), 200

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

# Syllabus upload endpoint
@app.route('/upload-syllabus', methods=['POST'])
def upload_syllabus():
    """
    Upload a syllabus CSV and return parsed data.
    """
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        df = pd.read_csv(file)
        grades = df.to_dict(orient="records")
        return jsonify({"grades": grades})
    except Exception as e:
        return jsonify({"error": str(e)}), 500





##########################################################################################################
def letter_to_grade_point(letter: str) -> float:
    """
    Converts a letter grade to its corresponding grade point.
    """
    grade_scale = {
        "A+": 4.0, "A": 4.0, "A-": 3.7,
        "B+": 3.3, "B": 3.0, "B-": 2.7,
        "C+": 2.3, "C": 2.0, "C-": 1.7,
        "D+": 1.3, "D": 1.0, "D-": 0.7,
        "F": 0.0
    }
    return grade_scale.get(letter, None)  # Return None if the grade is invalid


def grade_point_to_letter(grade_point: float) -> str:
    """
    Converts a grade point to its closest letter grade.
    """
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
    """
    Calculate GPA from a list of courses with existing grades.
    """
    # Filter out courses without grades
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
    """
    Calculate grade requirements for courses to achieve desired GPA.
    
    Args:
    - courses: Courses with or without grades
    - current_gpa: Current overall GPA
    - desired_gpa: Target GPA
    
    Returns:
    - List of grade requirements or error message
    """
    # Separate courses with and without grades
    graded_courses = [course for course in courses if 'grade' in course and course['grade']]
    ungraded_courses = [course for course in courses if 'grade' not in course or not course['grade']]
    
    # Calculate total credits
    total_credits = sum(course['credits'] for course in courses)
    
    # Calculate current total grade points
    current_grade_points = current_gpa * sum(course['credits'] for course in graded_courses)
    
    # Calculate total grade points required for desired GPA
    total_grade_points_required = desired_gpa * total_credits
    
    # Calculate additional grade points needed
    additional_grade_points = total_grade_points_required - current_grade_points
    
    if additional_grade_points <= 0:
        return "The desired GPA is lower than or equal to the current GPA. No changes are needed."
    
    # Prepare results for ungraded courses
    course_requirements = []
    remaining_points = additional_grade_points
    
    for course in ungraded_courses:
        # Hypothetical calculation of grade requirements
        max_possible_grade_point = 4.0  # Aim for highest possible grade
        min_possible_grade_point = max(
            letter_to_grade_point('C'),  # Minimum reasonable grade
            (remaining_points / course['credits']) + letter_to_grade_point('C')
        )
        
        # Adjust remaining points
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
##########################################################################################################
















# Initialize the database and create tables
with app.app_context():
    db.create_all()

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=False)  # Set debug to False in production
