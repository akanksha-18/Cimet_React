// import React, { useState } from 'react'

// const App = () => {
//   const[input,setInput]=useState('');
//   const[list,setList]=useState([]);
//   const[editIndex,setEditIndex]=useState(null);
//   const handleTodo=()=>{
//      if(editIndex!==null){
//        const newTodo=[...list];
//        newTodo[editIndex]=input;
//        setList(newTodo);
//        setEditIndex(null);
//      }
//      else{
//     setList([...list,input])
//      }
//      setInput('');
//   }
//   const handleEdit=(index)=>{
//      setInput(list[index]);
//      setEditIndex(index);
//   }
//   const handleDelete=(index)=>{
//     const newList=list.filter((_,id)=>id !==index);
//     setList(newList);
//   }
//   return (
//     <>
//      <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
//      <button onClick={handleTodo}>{editIndex!==null?'update':'Add'}</button> 
//      <ul>
//       {list.map((todo,index)=>(
//         <li key={index}>{todo}
//         <button onClick={()=>handleEdit(index)}>Edit</button>
//         <button onClick={()=>handleDelete(index)}>Delete</button>
//         </li>
//       ))}
//      </ul>
//     </>
//   )
// }

// export default App


import React, { useReducer } from 'react';


const initialState = {
  todos: [],
  input: '', 
  editIndex: null, 
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        input: '', 
      };
    case 'UPDATE_TODO':
      // eslint-disable-next-line no-case-declarations
      const updatedTodos = state.todos.map((todo, index) =>
        index === action.payload.index ? action.payload.text : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        input: '', 
        editIndex: null, 
      };
    case 'DELETE_TODO':
      // eslint-disable-next-line no-case-declarations
      const filteredTodos = state.todos.filter((_, index) => index !== action.payload);
      return {
        ...state,
        todos: filteredTodos,
      };
    case 'SET_INPUT':
      return {
        ...state,
        input: action.payload, 
      };
    case 'SET_EDIT_INDEX':
      return {
        ...state,
        editIndex: action.payload, 
        input: state.todos[action.payload] || '', 
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState); 

  const handleTodo = () => {
    if (state.editIndex !== null) {
      dispatch({ type: 'UPDATE_TODO', payload: { index: state.editIndex, text: state.input } });
    } else {
      dispatch({ type: 'ADD_TODO', payload: state.input }); 
    }
  };

  const handleEdit = (index) => {
    dispatch({ type: 'SET_EDIT_INDEX', payload: index }); 
  };

  const handleDelete = (index) => {
    dispatch({ type: 'DELETE_TODO', payload: index }); 
  };

  return (
    <>
      <input
        type="text"
        value={state.input}
        onChange={(e) => dispatch({ type: 'SET_INPUT', payload: e.target.value })} 
      />
      <button onClick={handleTodo}>
        {state.editIndex !== null ? 'Update' : 'Add'}
      </button>

      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleEdit(index)}>Edit</button> 
            <button onClick={() => handleDelete(index)}>Delete</button> 
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;

