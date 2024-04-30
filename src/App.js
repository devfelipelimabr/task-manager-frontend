// App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TagList from './components/TagList';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {token ? (
        <>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          <TaskList token={token} />
          <TagList token={token} />
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <Signup onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default App;
