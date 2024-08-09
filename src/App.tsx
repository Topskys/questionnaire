import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import QuestionLayout from './layouts/QuestionLayout'
import Edit from './pages/question/Edit'

function App() {
  // 检查登录
  return (
    <div className="App">
      <Routes>
        <Route path="/question" element={<QuestionLayout />}>
          <Route path="edit/:id" element={<Edit />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
