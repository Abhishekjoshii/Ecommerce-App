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
        "price": 55000,
        "offer": "10% OFF",
        "image": "https://cdn.pixabay.com/photo/2014/05/02/21/50/laptop-336373_1280.jpg"
    },

    {
        "id": 2,
        "name": "Smartphone",
        "price": 25000,
        "offer": "15% OFF",
        "image": "https://cdn.pixabay.com/photo/2016/11/29/09/08/mobile-phone-1869510_1280.jpg"
    },

    {
        "id": 3,
        "name": "Headphones",
        "price": 3000,
        "offer": "5% OFF",
        "image": "https://cdn.pixabay.com/photo/2016/11/19/14/00/headphones-1837422_1280.jpg"
    },

    {
        "id": 4,
        "name": "Smart Watch",
        "price": 7000,
        "offer": "20% OFF",
        "image": "https://cdn.pixabay.com/photo/2017/08/06/22/01/apple-2592442_1280.jpg"
    },

    {
        "id": 5,
        "name": "Gaming Mouse",
        "price": 1500,
        "offer": "12% OFF",
        "image": "https://cdn.pixabay.com/photo/2014/12/27/15/40/mouse-581706_1280.jpg"
    },

    {
        "id": 6,
        "name": "Keyboard",
        "price": 2500,
        "offer": "18% OFF",
        "image": "https://cdn.pixabay.com/photo/2016/11/29/06/15/computer-1867758_1280.jpg"
    },

    {
        "id": 7,
        "name": "Camera",
        "price": 45000,
        "offer": "8% OFF",
        "image": "https://cdn.pixabay.com/photo/2016/11/29/09/32/camera-1867184_1280.jpg"
    },

    {
        "id": 8,
        "name": "Bluetooth Speaker",
        "price": 4000,
        "offer": "25% OFF",
        "image": "https://cdn.pixabay.com/photo/2016/11/29/05/08/audio-1867121_1280.jpg"
    },

    {
        "id": 9,
        "name": "Tablet",
        "price": 18000,
        "offer": "14% OFF",
        "image": "https://cdn.pixabay.com/photo/2014/09/27/13/44/tablet-463264_1280.jpg"
    },

    {
        "id": 10,
        "name": "Monitor",
        "price": 12000,
        "offer": "11% OFF",
        "image": "https://cdn.pixabay.com/photo/2014/05/02/21/47/computer-336378_1280.jpg"
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