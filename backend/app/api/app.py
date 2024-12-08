import os
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from flask_cors import CORS
from routes.authRoutes import auth
from config import Config
from routes.gpa import gpaBp
from routes.module import moduleBp

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)  # Apply configurations
CORS(app)  # Enable CORS for all domains (restrict in production as needed)

# Initialize extensions
jwt = JWTManager(app)

# Health check endpoint
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "Backend": "StudentMetrics",
        "status": "healthy"
    }), 200



# Registe Blueprints for calculation of gpa
app.register_blueprint(gpaBp, url_prefix='/api')
app.register_blueprint(moduleBp, url_prefix='/api')
    

    
# Protected route requiring JWT authentication
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    current_user_id = get_jwt_identity()
    return jsonify({"message": f"Welcome, user with ID {current_user_id}!"}), 200


@app.route('/routes', methods=['GET'])
def list_routes():
    """List all available routes for debugging."""
    routes = []
    for rule in app.url_map.iter_rules():
        routes.append({
            "route": rule.rule,
            "methods": list(rule.methods)
        })
    return jsonify(routes), 200


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)  # Set debug to False in production
