import React, { useState } from 'react';
import GitHubIcon from './GitHubIcon';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
      }

      const data = await response.json();
      localStorage.setItem('username', data.username); // Save username locally
      setMessage('Login successful!');
      window.location.href = '/submit'; // Redirect to Submit page
    } catch (err) {
      console.error('Login error:', err.message);
      setMessage(`Error: ${err.message}`);
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Login</h1>
      {message && (
        <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', margin: '10px', width: '250px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '10px', margin: '10px', width: '250px' }}
      />
      <br />
      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
      <br />
      <p style={{ marginTop: '20px' }}>Don't have an account?</p>
      <button
        onClick={handleRegister}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Register
      </button>
      <GitHubIcon />
    </div>
  );
}

export default Login;
