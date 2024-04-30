// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/signup', { email, password })
      .then(response => {
        const { token } = response.data;
        onLogin(token);
        setMessage('Usuário cadastrado com sucesso!'); // Define a mensagem de sucesso
      })
      .catch(error => {
        setMessage('Erro ao cadastrar usuário. Por favor, tente novamente.'); // Define a mensagem de erro
        console.error('Error signing up:', error);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {message && <div className="alert alert-info">{message}</div>} {/* Exibe a mensagem, se houver */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
