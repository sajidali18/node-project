import React from 'react'
import HomePage from './Components/HomePage'
import Display from './Components/Display'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all" element={<Display />} />
      </Routes>
    </Router>
  )
}

export default App