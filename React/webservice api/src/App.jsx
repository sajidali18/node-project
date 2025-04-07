import React from 'react'
import HomePage from './Components/HomePage'
import Display from './Components/Display'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './Components/Login'
import Room from './Components/Room'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all" element={<Display />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </Router>
  )
}

export default App