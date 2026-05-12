import Navbar from '../components/Navbar';

function Cart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Navbar />

      <div className='cart-container'>
        <h1>Cart Items</h1>

        {cart.map((item, index) => (
          <div className='cart-item' key={index}>
            <img src={item.image} alt={item.name} />

            <div>
              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>
            </div>
          </div>
        ))}
         <h2>Total: ₹ {total}</h2>
      </div>
    </div>
  );
}

export default Cart;