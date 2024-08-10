import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import QuestionLayout from './layouts/QuestionLayout'
import Edit from './pages/question/Edit'
import Stat from './pages/question/Stat'

function App() {
  // 检查登录
  return (
    <div className="App">
      <Routes>
        <Route path="/question" element={<QuestionLayout />}>
          <Route path="edit/:id" element={<Edit />} />
          {/* 统计分析  Statistics*/}
          <Route path="stat/:id" element={<Stat />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
