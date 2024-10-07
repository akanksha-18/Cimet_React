import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNewTodo, addTodo, deleteTodo, toggleTodo, setEditingTodoId, updateTodo, setEditingTitle } from '../slices/TodoSlice';

const Todo = () => {
  const todos = useSelector((state) => state.todos.todos);
  const newTodo = useSelector((state) => state.todos.newTodo);
  const editingTodoId = useSelector((state) => state.todos.editingTodoId); 
  const editingTitle = useSelector((state) => state.todos.editingTitle);   
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo()); 
  };

  const handleEditTodo = (id) => {
    dispatch(setEditingTodoId(id)); 
  };

  const handleSaveTodo = () => {
    dispatch(updateTodo());
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id)); 
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}  
        onChange={(e) => dispatch(setNewTodo(e.target.value))} 
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                
                <input
                  type="text"
                  value={editingTitle} 
                  onChange={(e) => dispatch(setEditingTitle(e.target.value))} 
                />
                <button onClick={handleSaveTodo}>Save</button>
              </>
            ) : (
              <>
                
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
                <button onClick={() => handleEditTodo(todo.id)} disabled={todo.completed}>Edit</button>
                <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
