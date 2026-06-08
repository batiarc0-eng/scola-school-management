import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const getDashboardRoute = () => {
    switch(user.role) {
      case 'student':
        return '/student';
      case 'teacher':
        return '/teacher';
      case 'parent':
        return '/parent';
      case 'admin':
        return '/admin';
      default:
        return '/login';
    }
  };

  React.useEffect(() => {
    navigate(getDashboardRoute());
  }, [user.role]);

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">Scola</div>
        <div className="navbar-info">
          <span>Bienvenue, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
        </div>
      </nav>
    </div>
  );
}

export default Dashboard;
