import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleLogin = async () => {
    try {
      await api.post('/login', {
        username,
        password,
      });

      localStorage.setItem('user', username);
      navigate('/home');
    } catch (error) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className={`auth-page ${loaded ? 'loaded' : ''}`}>
      <div className='auth-card'>
        <div className='card-header'>
          <div>
            <h1>Welcome Back</h1>
            <p>Secure access to your shopping dashboard.</p>
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

        <button className='auth-button' onClick={handleLogin}>
          Login
        </button>

        <p className='auth-footer'>
          Don't have an account?
          <Link to='/signup'> Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;