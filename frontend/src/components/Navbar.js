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

  return (
    <div className='navbar'>
      <h2>ShopEasy</h2>

      <div>
        <Link to='/home'>Home</Link>
        <Link to='/cart'>Cart</Link>
        <Link to='/payment'>Payment</Link>
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