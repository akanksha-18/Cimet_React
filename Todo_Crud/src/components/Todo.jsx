import React, { useEffect, useState } from 'react';
import './Todo.css'; 

const getLocalItems = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list);
  }
  return [];
};

const Todo = () => {
  const [Todo, setTodo] = useState('');
  const [list, setList] = useState(getLocalItems());
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const changeText = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    if (!Todo.trim()) return;
    if (isEditing) {
      const updatedList = list.map((item, index) =>
        index === editIndex ? { ...item, text: Todo } : item
      );
      setList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setList([...list, { text: Todo, completed: false }]);
    }
    setTodo('');
  };

  const editTask = (index) => {
    setTodo(list[index].text);
    setIsEditing(true);
    setEditIndex(index);
  };

  const removeTask = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  const completeTask = (index) => {
    const updatedList = list.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <div className="container">
      <h1 className="todo-header">Todo App</h1>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter your todos"
        value={Todo}
        onChange={changeText}
      />
      <button className="todo-button" onClick={addTodo}>
        {isEditing ? 'Update' : 'Add'}
      </button>

      {list.length > 0 ? (
        <ul className="todo-list">
          {list.map((item, index) => (
            <li
              key={index}
              className={`todo-item ${item.completed ? 'completed' : ''}`}
            >
              <span>{item.text}</span>
              <div>
                <button onClick={() => completeTask(index)}>
                  {item.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => removeTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
};

export default Todo;
