import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/home/login'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}