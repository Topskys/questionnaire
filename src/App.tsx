import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  // TODO: 检查登录
  return <RouterProvider router={router}></RouterProvider>
}

export default App
