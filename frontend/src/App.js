import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {user ? (
          <>
            <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
            <Route path="/student" element={user.role === 'student' ? <StudentDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
            <Route path="/teacher" element={user.role === 'teacher' ? <TeacherDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
            <Route path="/parent" element={user.role === 'parent' ? <ParentDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
            <Route path="/admin" element={user.role === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/dashboard" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
