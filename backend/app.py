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
        "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    },

    {
        "id": 2,
        "name": "Smartphone",
        "price": 25000,
        "offer": "15% OFF",
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },

    {
        "id": 3,
        "name": "Headphones",
        "price": 3000,
        "offer": "5% OFF",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        "id": 4,
        "name": "Smart Watch",
        "price": 7000,
        "offer": "20% OFF",
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        "id": 5,
        "name": "Gaming Mouse",
        "price": 1500,
        "offer": "12% OFF",
        "image": "https://images.unsplash.com/photo-1527814050087-3793815479db"
    },

    {
        "id": 6,
        "name": "Keyboard",
        "price": 2500,
        "offer": "18% OFF",
        "image": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"
    },

    {
        "id": 7,
        "name": "Camera",
        "price": 45000,
        "offer": "8% OFF",
        "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },

    {
        "id": 8,
        "name": "Bluetooth Speaker",
        "price": 4000,
        "offer": "25% OFF",
        "image": "https://images.unsplash.com/photo-1589003077984-894e133dabab"
    },

    {
        "id": 9,
        "name": "Tablet",
        "price": 18000,
        "offer": "14% OFF",
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
    },

    {
        "id": 10,
        "name": "Monitor",
        "price": 12000,
        "offer": "11% OFF",
        "image": "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc"
    },
    {
        "id": 11,
        "name": "Men's Graphic T-Shirt",
        "price": 799,
        "offer": "30% OFF",
        "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
    },
    {
        "id": 12,
        "name": "Women's Denim Jacket",
        "price": 1899,
        "offer": "20% OFF",
        "image": "https://i5.walmartimages.com/seo/Viikei-Womens-Denim-Jackets-Plus-Size-Denim-Jackets-for-Women-Clearance-Classic-Casual-Solid-Color-Short-Long-sleeve-Denim-Blouse-Jacket-Coat_d23874c4-ab98-4048-8bcf-58b5e6fbcc57.4e887b239ef10bf433c849df7ffd9cbf.jpeg"
    },
    {
        "id": 13,
        "name": "Casual Blue Jeans",
        "price": 1299,
        "offer": "25% OFF",
        "image": "https://cdn.cliqueinc.com/posts/310328/best-dark-wash-jeans-nordstrom-310328-1703118208742-main.750x0c.jpg?interlace=true&quality=70"
    },
    {
        "id": 14,
        "name": "Classic Hoodie",
        "price": 1499,
        "offer": "18% OFF",
        "image": "https://dms.deckers.com/ugg/image/upload/f_auto,q_40,dpr_2/b_rgb:f4f2ee/w_483/v1734384882/1158751-DTB_1.png?_s=RAABAB0"
    },
    {
        "id": 15,
        "name": "Summer Floral Dress",
        "price": 1599,
        "offer": "22% OFF",
        "image": "https://www.stylesweekly.com/wp-content/uploads/2016/06/10-best-floral-dresses-for-beautiful-summer-1-800x1039.jpg"
    },
    {
        "id": 16,
        "name": "Black Leather Jacket",
        "price": 3499,
        "offer": "15% OFF",
        "image": "https://tse3.mm.bing.net/th/id/OIP.je9ZbbgD2WxhjDLzr7gZSgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        "id": 17,
        "name": "Sports Running Shoes",
        "price": 2499,
        "offer": "20% OFF",
        "image": "https://i5.walmartimages.com/seo/Kricely-Men-s-Trail-Running-Shoes-Fashion-Walking-Hiking-Sneakers-Men-Tennis-Cross-Training-Shoe-Outdoor-Snearker-Mens-Casual-Workout-Footwear-Tie-dy_b4edf81c-4a0e-494f-ab8f-5310ea0dc80d.102205b429f8869dc851a8dc5c548ced.jpeg"
    },
    {
        "id": 18,
        "name": "White Sneakers",
        "price": 2199,
        "offer": "10% OFF",
        "image": "https://m.media-amazon.com/images/I/71z6GTSGhJL.jpg"
    },
    {
        "id": 19,
        "name": "Men's Formal Shirt",
        "price": 1399,
        "offer": "30% OFF",
        "image": "https://i5.walmartimages.com/seo/qolati-Men-s-Formal-Dress-Shirt-Classic-Solid-Button-Front-Wrinkle-Free-Blouse-Regular-Fit-Stretch-Business-Formal-Shirts_497365fa-7956-4e07-bf4a-3f9948fddce7.cb5b5e5daf2276c988866b3cb9cb3bdd.jpeg"
    },
    {
        "id": 20,
        "name": "Cozy Knit Sweater",
        "price": 1699,
        "offer": "25% OFF",
        "image": "https://i.pinimg.com/originals/b8/50/39/b85039b41211003af5ea4264e6ccaa92.jpg"
    },
    {
        "id": 21,
        "name": "Denim Shorts",
        "price": 899,
        "offer": "20% OFF",
        "image": "https://i.pinimg.com/originals/ba/e6/02/bae602337b7108b392f1762fbc7248d9.jpg"
    },
    {
        "id": 22,
        "name": "Women's Casual Shirt",
        "price": 1199,
        "offer": "18% OFF",
        "image": "https://i5.walmartimages.com/seo/BILIKEYU-Women-s-Daily-Casual-Linen-Shirts-Shirts-for-Women-Button-Down-Shirts-for-Women-Casual-Shirts-for-Women_e6d7b9be-5075-4d47-b913-0da41d62656d.461467083ef1bea51e2719140d34b7e4.jpeg"
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