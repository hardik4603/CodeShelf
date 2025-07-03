import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Components/Home.jsx'
import Navbar from './Components/Navbar.jsx'
import Pastes from './Components/Pastes'
import './App.css'
import ViewPaste from './Components/ViewPaste.jsx'
   
function App() {

  const Router=createBrowserRouter([

    {
      path: '/',
      element: <div>
        <Navbar/>
        <Home/>
      </div>
    },

    {
      path: '/pastes',
      element:  <div>
      <Navbar/>
      <Pastes/>
    </div>,
    },

    {
      path: '/pastes/:id',
      element: <div>
        <Navbar/>
        <ViewPaste/>
      </div>,
    }

    
  ]);
  

  return (
    <RouterProvider router={Router}/>
  )
}

export default App
