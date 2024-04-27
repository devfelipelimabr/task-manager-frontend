import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        date: '',
        duration: '',
        tagId: ''
    });
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTask, setEditingTask] = useState({
        title: '',
        description: '',
        date: '',
        duration: '',
        tagId: ''
    });
    const [filterTitle, setFilterTitle] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/tasks/all')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });

        axios.get('http://localhost:3000/tags')
            .then(response => {
                setTags(response.data);
            })
            .catch(error => {
                console.error('Error fetching tags:', error);
            });
    }, []);

    const formatDate = date => {
        const formattedDate = new Date(date).toLocaleDateString('pt-BR');
        return formattedDate;
    };

    const handleCreateTask = () => {
        axios.post('http://localhost:3000/tasks', newTask)
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTask({
                    title: '',
                    description: '',
                    date: '',
                    duration: '',
                    tagId: ''
                });
            })
            .catch(error => {
                console.error('Error creating task:', error);
            });
    };

    const handleEditTask = taskId => {
        const taskToEdit = tasks.find(task => task.id === taskId);
        setEditingTaskId(taskId);
        setEditingTask({
            title: taskToEdit.title,
            description: taskToEdit.description,
            date: taskToEdit.date,
            duration: taskToEdit.duration,
            TagId: taskToEdit.TagId
        });
    };

    const handleUpdateTask = () => {
        axios.put(`http://localhost:3000/tasks/${editingTaskId}`, editingTask)
            .then(() => {
                const updatedTasks = tasks.map(task =>
                    task.id === editingTaskId ? { ...task, ...editingTask } : task
                );
                setTasks(updatedTasks);
                setEditingTaskId(null);
                setEditingTask({
                    title: '',
                    description: '',
                    date: '',
                    duration: '',
                    TagId: ''
                });
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };

    const handleDeleteTask = taskId => {
        axios.delete(`http://localhost:3000/tasks/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    const handleFilter = () => {
        const tag = tags.find(tag => tag.name === filterTag);
        const tagId = tag ? tag.id : null;
        axios.get('http://localhost:3000/tasks', {
            params: {
                title: filterTitle,
                TagId: tagId,
                date: filterDate
            }
        })
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching filtered tasks:', error);
            });
    };


    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-light">Tasks</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Filter by title"
                    value={filterTitle}
                    onChange={e => setFilterTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Filter by tag"
                    value={filterTag}
                    onChange={e => setFilterTag(e.target.value)}
                />
                <input
                    type="date"
                    className="form-control mb-2"
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                />

                <button className="btn btn-primary" onClick={handleFilter}>Filter</button>
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                />
                <input
                    type="date"
                    className="form-control"
                    value={newTask.date}
                    onChange={e => setNewTask({ ...newTask, date: e.target.value })}
                />
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter task duration"
                    value={newTask.duration}
                    onChange={e => setNewTask({ ...newTask, duration: e.target.value })}
                />
                <select
                    className="form-control"
                    value={newTask.TagId}
                    onChange={e => setNewTask({ ...newTask, TagId: e.target.value })}
                >
                    <option value="">Select Tag</option>
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                </select>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={handleCreateTask}>Add Task</button>
                </div>
            </div>
            <ul className="list-group list-group-flush">
                {tasks.map(task => (
                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editingTaskId === task.id ? (
                            <div>
                                <input
                                    type="text"
                                    className="form-control mb-1"
                                    value={editingTask.title}
                                    onChange={e => setEditingTask({ ...editingTask, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="form-control mb-1"
                                    value={editingTask.description}
                                    onChange={e => setEditingTask({ ...editingTask, description: e.target.value })}
                                />
                                <input
                                    type="date"
                                    className="form-control mb-1"
                                    value={editingTask.date}
                                    onChange={e => setEditingTask({ ...editingTask, date: e.target.value })}
                                />
                                <input
                                    type="number"
                                    className="form-control mb-1"
                                    value={editingTask.duration}
                                    onChange={e => setEditingTask({ ...editingTask, duration: e.target.value })}
                                />
                                <select
                                    className="form-control mb-1"
                                    value={editingTask.TagId}
                                    onChange={e => setEditingTask({ ...editingTask, TagId: e.target.value })}
                                >
                                    {tags.map(tag => (
                                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                                    ))}
                                </select>
                                <button className="btn btn-success btn-sm mr-1" onClick={handleUpdateTask}>Save</button>
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditingTaskId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <h5>{task.title}</h5>
                                <p>{task.description}</p>
                                <p>Date: {formatDate(task.date)}</p>
                                <p>Duration: {task.duration}</p>
                                <p>Tag: {tags.find(tag => tag.id === task.TagId)?.name}</p>
                                <button className="btn btn-primary btn-sm mr-1" onClick={() => handleEditTask(task.id)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
