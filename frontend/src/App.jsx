import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import SemesterManagement from './components/SemesterManagement';
import UpdateLogs from './components/UpdateLogs';
import Settings from './components/Settings';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  useEffect(() => {
    // Bootstrap initial theme from local storage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/semesters" element={<SemesterManagement />} />
              <Route path="/logs" element={<UpdateLogs />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
