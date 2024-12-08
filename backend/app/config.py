import os 

class Config: 
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key_here')
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI', 'mysql+pymysql://root:kestonCole123@localhost:3306/grade_calculator')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret_key')
    
    

GPA_SCALES = {
    "4.0": {
        "A": 4.0,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "C-": 1.7,
        "D+": 1.3,
        "D": 1.0,
        "D-": 0.7,
        "F": 0.0
    },
    "4.3": {
        "A+": 4.3,
        "A": 4.0,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "C-": 1.7,
        "D+": 1.3,
        "D": 1.0,
        "D-": 0.7,
        "F": 0.0
    },
    "5.0": {
        "A+": 5.0,
        "A": 4.0,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "C-": 1.7,
        "D+": 1.3,
        "D": 1.0,
        "D-": 0.7,
        "F": 0.0
    }
}
