import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    await api.post('/signup', {
      username,
      password
    });

    alert('Signup Successful');

    navigate('/');
  };

  return (
    <div className='auth-container'>
        <h1>Signup</h1>

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

      <button onClick={handleSignup}>Signup</button>

      <p>
        Already have an account?
        <Link to='/'> Login</Link>
      </p>
    </div>
  );
}

export default Signup;