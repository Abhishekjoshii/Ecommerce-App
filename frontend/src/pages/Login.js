import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await api.post('/login', {
        username,
        password
      });

      localStorage.setItem('user', username);

      navigate('/home');
    } catch (error) {
      alert('Invalid Credentials');
    }
};
return (
    <div className='auth-container'>
      <h1>Login</h1>

      <input
        type='text'
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have an account?
        <Link to='/signup'> Signup</Link>
      </p>
    </div>
  );
}

export default Login;