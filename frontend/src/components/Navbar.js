import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/');
  };

  const getLinkClass = (path) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <div className='navbar'>
      <h2>ShopEasy</h2>

      <div className='nav-actions'>
        <Link className={getLinkClass('/home')} to='/home'>Home</Link>
        <Link className={getLinkClass('/cart')} to='/cart'>Cart</Link>
        <Link className={getLinkClass('/wishlist')} to='/wishlist'>Wishlist</Link>
        <Link className={getLinkClass('/payment')} to='/payment'>Payment</Link>
        {user && location.pathname !== '/' && location.pathname !== '/signup' && (
          <button className='logout-button' onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;