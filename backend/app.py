from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 50000,
        "offer": "10% OFF",
        "image": "https://via.placeholder.com/200"
    },
    {
        "id": 2,
        "name": "Phone",
        "price": 20000,
        "offer": "15% OFF",
        "image": "https://via.placeholder.com/200"
    },
    {
        "id": 3,
        "name": "Headphones",
        "price": 3000,
        "offer": "5% OFF",
        "image": "https://via.placeholder.com/200"
    }
]

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json

    username = data['username']
    password = data['password']

    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Signup Successful"})
@app.route('/login', methods=['POST'])
def login():
    data = request.json

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({"message": "Login Successful"})
    else:
        return jsonify({"message": "Invalid Credentials"}), 401

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)