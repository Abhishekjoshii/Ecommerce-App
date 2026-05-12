import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
      <h2>ShopEasy</h2>

      <div>
        <Link to='/home'>Home</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/payment'>Payment</Link>
      </div>
    </div>
  );
}

export default Navbar;