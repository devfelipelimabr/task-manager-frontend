// App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TagList from './components/TagList';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className='main'>
      <h1 className='main-title'>Task Manager</h1>
      {token ? (
        <>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          <TaskList token={token} />
          <TagList token={token} />
        </>
      ) : (
        <>
          {showLogin ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Signup onLogin={handleLogin} />
          )}
          <button className="btn btn-secondary" onClick={toggleForm}>
            {showLogin ? 'Sign Up' : 'Login'}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
