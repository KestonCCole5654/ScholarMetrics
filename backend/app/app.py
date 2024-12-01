import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from flask_cors import CORS
from gpa import gpa
import pandas as pd


# Load environment variables from .env
load_dotenv()

# Centralized Configuration Class
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_here')  # Fallback to default for development
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI', 'mysql+pymysql://root:kestonCole123@localhost:3306/grade_calculator')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret_key')

# Initialize Flask App
app = Flask(__name__)
app.config.from_object(Config)  # Load configurations from the Config class
# Enable CORS for all domains (you can restrict it to specific origins later)
CORS(app)


# Initialize Extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Define the User model (represents the users table in the database)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)


# Registration route for user to register
@app.route('/register', methods=['POST'])
def user_register():
    data = request.get_json()

    username = data.get('username')
    email = data.get('email')  # Optional if you don't need it
    password = data.get('password')

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message": "User already exists!"}), 400

    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User Registered Successfully"}), 201

# Login route for user to login using username
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')  # Change to username
    password = data.get('password')

    user = User.query.filter_by(username=username).first()  # Filter by username instead of email

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid username or password"}), 401

    access_token = create_access_token(identity= str(user.id))  # Use user.id instead of a dictionary
    return jsonify({"access_token": access_token, "username": username}), 200


# Protected Routes that need JWT authentication for user to access
@app.route('/protected', methods=['GET'])
@jwt_required()
def routes():
    # Get user ID from the JWT
    current_user_id = get_jwt_identity()

    # Fetch user details from the database
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"message": "User not found!"}), 404

    # Return a success message with the user's username
    return jsonify({"message": f"Welcome, {user.username}!"}), 200



@app.route('/calculate-gpa', methods=['POST'])
def calculate_gpa_endpoint():
    data = request.get_json()  # Get data from frontend
    grades = data.get('grades')
    
    # Convert scale to string, with default
    scale = str(data.get('scale', "4.0"))
    
    if not grades:
        return jsonify({"error": "Grades are required"}), 400

    try:
        # Call the GPA calculation function with the selected scale
        calculated_gpa = gpa(grades, scale)
        return jsonify({
            "gpa": calculated_gpa,
            "scale": scale
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400



@app.route('/calculate-grade', methods=['POST'])
def calculate_grade():
    try:
        # Parse the JSON payload
        data = request.get_json()
        print("Received data:", data)  # Debugging line

        if not data or 'grades' not in data:
            return jsonify({"error": "No grades provided"}), 400

        grades = data['grades']

        if not isinstance(grades, list) or len(grades) == 0:
            return jsonify({"error": "Assessments must be a non-empty array"}), 400

        # Calculate weighted average
        total_weight = sum(item['weight'] for item in grades)
        if total_weight == 0:
            return jsonify({"error": "Total weight cannot be zero"}), 400

        final_grade = sum(item['weight'] * item['grade'] / total_weight for item in grades)
        return jsonify({"finalGrade": round(final_grade, 2)})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred"}), 500


@app.route('/upload-syllabus', methods=['POST'])
def upload_syllabus():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        # Read CSV file into a DataFrame
        df = pd.read_csv(file)
        # Convert to a list of dictionaries
        grades = df.to_dict(orient="records")
        return jsonify({"grades": grades})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Initialize the database and create tables
with app.app_context():
    db.create_all()

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
