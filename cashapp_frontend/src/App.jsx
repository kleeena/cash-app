import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import Landing from './components/Landing.jsx'
import Landing_login from './components/Landing_login.jsx'
import Navbar_V2 from './components/Navbar_v2.jsx'
import Dashboard from './components/Dashboard.jsx'
import Fiat from './components/FiatDashboard.jsx'
import LoadFunds from './components/LoadFunds.jsx'
import SendFund from "./components/SendFunds.jsx"
import Register from "./components/Register.jsx"
import AuthLayout from './components/AuthLayout.jsx';
import BackButtonHandler from "./components/BackButtonHandler.jsx"; // Import handler

function App() {
  

  return (

    <BrowserRouter>
    <BackButtonHandler />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Landing_login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes - Require Authentication */}
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/load-funds" element={<LoadFunds />} />
        <Route path="/send-funds" element={<SendFund />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>

  )

   
}

export default App;
