// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signup', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin(token);
    } catch (error) {
      setError('Email already in use');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label>Email:</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
