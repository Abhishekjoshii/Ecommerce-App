import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSignup = async () => {
    await api.post('/signup', {
      username,
      password,
    });

    alert('Signup Successful');
    navigate('/');
  };

  return (
    <div className={`auth-page ${loaded ? 'loaded' : ''}`}>
      <div className='auth-card'>
        <div className='card-header'>
          <div>
            <h1>Create Account</h1>
            <p>Join now and enjoy a premium shopping experience.</p>
          </div>
        </div>

        <div className='input-group'>
          <span className='input-icon'>👤</span>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='input-group'>
          <span className='input-icon'>🔒</span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='button'
            className='password-toggle'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button className='auth-button' onClick={handleSignup}>
          Signup
        </button>

        <p className='auth-footer'>
          Already have an account?
          <Link to='/'> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;