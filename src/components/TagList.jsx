// TagList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TagList() {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [editingTagId, setEditingTagId] = useState(null);
  const [editingTagName, setEditingTagName] = useState('');
  const [editingTagOriginalName, setEditingTagOriginalName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/tags')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  const handleCreateTag = () => {
    axios.post('http://localhost:3000/tags', { name: newTagName })
      .then(response => {
        setTags([...tags, response.data]);
        setNewTagName('');
      })
      .catch(error => {
        console.error('Error creating tag:', error);
      });
  };

  const handleDeleteTag = tagId => {
    axios.delete(`http://localhost:3000/tags/${tagId}`)
      .then(() => {
        setTags(tags.filter(tag => tag.id !== tagId));
      })
      .catch(error => {
        console.error('Error deleting tag:', error);
      });
  };

  const handleEditTag = () => {
    axios.put(`http://localhost:3000/tags/${editingTagId}`, { name: editingTagName })
      .then(() => {
        const updatedTags = tags.map(tag => {
          if (tag.id === editingTagId) {
            return { ...tag, name: editingTagName };
          }
          return tag;
        });
        setTags(updatedTags);
        setEditingTagId(null);
        setEditingTagName('');
        setEditingTagOriginalName('');
      })
      .catch(error => {
        console.error('Error editing tag:', error);
      });
  };

  const handleCancelEditTag = () => {
    setEditingTagId(null);
    setEditingTagName('');
    setEditingTagOriginalName('');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-light">Tags</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter tag name"
          value={newTagName}
          onChange={e => setNewTagName(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={handleCreateTag}>Add Tag</button>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        {tags.map(tag => (
          <li key={tag.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingTagId === tag.id ? (
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={editingTagName}
                  onChange={e => setEditingTagName(e.target.value)}
                />
                <button className="btn btn-success btn-sm mr-1" onClick={handleEditTag}>Save</button>
                <button className="btn btn-secondary btn-sm" onClick={handleCancelEditTag}>Cancel</button>
              </div>
            ) : (
              <div>{tag.name}</div>
            )}
            <div>
              <button className="btn btn-warning btn-sm mr-2" onClick={() => setEditingTagId(tag.id)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTag(tag.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagList;
