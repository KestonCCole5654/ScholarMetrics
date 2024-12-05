from flask_sqlalchemy import SQLAlchemy

# Initialize the SQLAlchemy object
db = SQLAlchemy()

def setup_db(app):
    """
    Sets up the database connection for the Flask app.
    This function applies configurations and initializes the SQLAlchemy instance.

    Args:
        app: The Flask application instance.
    """
    db.app = app
    db.init_app(app)
    return db
