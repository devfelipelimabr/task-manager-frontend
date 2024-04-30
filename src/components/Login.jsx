// Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', { email, password })
            .then(response => {
                const { token } = response.data;
                onLogin(token); // Chama a função onLogin passando o token retornado pelo backend
            })
            .catch(error => {
                setErrorMessage('Erro ao efetuar login. Verifique suas credenciais e tente novamente.'); // Define a mensagem de erro
                console.error('Error logging in:', error);
            });
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Exibe a mensagem de erro, se houver */}
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
