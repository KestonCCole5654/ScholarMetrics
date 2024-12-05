
import os
from typing import List, Dict, Union
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from flask_cors import CORS
from api.gpa.gpa import gpa
from models.user import db, User #imports the extracted model
from models.setup_db import setup_db
from routes.authRoutes import auth
from config import Config
from api.gpa.gpa import gpa_bp  # Import the GPA blueprint

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)  # Apply configurations
CORS(app)  # Enable CORS for all domains (restrict in production as needed)

# Set up the database
setup_db(app)

# Create the database tables if they don't exist
with app.app_context():
    db.create_all()
# Initialize extensions
jwt = JWTManager(app)

app.config.from_object(Config)

# Health check endpoint
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "Backend": "StudentMetrics",
        "status": "healthy"
    }), 200

# Register blueprints
app.register_blueprint(auth, url_prefix='/auth')

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


# Register blueprints
app.register_blueprint(gpa, url_prefix='/gpa')  # Prefix for GPA-related routes



# Run the Flask app
if __name__ == '__main__':
    app.run(debug=False)  # Set debug to False in production
