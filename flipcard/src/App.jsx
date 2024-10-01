import React from 'react'
import Start from './components/Start'
import Flip from './components/Flip';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router=createBrowserRouter([
  {
    path:'/',
    element:<Start/>
  },{
    path:'/Flip',
    element:<Flip/>
  }
])
const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
