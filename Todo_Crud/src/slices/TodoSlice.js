import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  newTodo: '',        
  editingTodoId: null, 
  editingTitle: ''     
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setNewTodo: (state, action) => {
      state.newTodo = action.payload;
    },
    addTodo: (state) => {
      if (state.newTodo) {
        state.todos.push({
          id: Date.now(),
          title: state.newTodo,
          completed: false
        });
        state.newTodo = ''; 
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setEditingTodoId: (state, action) => {
      state.editingTodoId = action.payload;
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        state.editingTitle = todo.title; 
      }
    },
    updateTodo: (state) => {
      const todo = state.todos.find(todo => todo.id === state.editingTodoId);
      if (todo) {
        todo.title = state.editingTitle; 
        state.editingTodoId = null;      
        state.editingTitle = '';         
      }
    },
    setEditingTitle: (state, action) => {
      state.editingTitle = action.payload; 
    }
  }
});

export const { setNewTodo, addTodo, deleteTodo, toggleTodo, setEditingTodoId, updateTodo, setEditingTitle } = todoSlice.actions;
export default todoSlice.reducer;
