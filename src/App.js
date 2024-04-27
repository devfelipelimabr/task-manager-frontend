// App.js
import React from 'react';
import TaskList from './components/TaskList';
import TagList from './components/TagList';

function App() {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskList />
      <TagList />
    </div>
  );
}

export default App;
