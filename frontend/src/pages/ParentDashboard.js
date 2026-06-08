import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ParentDashboard.css';

function ParentDashboard({ user, onLogout }) {
  const [children, setChildren] = useState([]);
  const [grades, setGrades] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [activeTab, setActiveTab] = useState('children');
  const navigate = useNavigate();

  useEffect(() => {
    loadParentData();
  }, []);

  const loadParentData = async () => {
    try {
      const token = localStorage.getItem('token');
      // Load children and their data
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">Scola - Parent</div>
        <div className="navbar-info">
          <span>Bienvenue, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="sidebar">
          <button 
            className={activeTab === 'children' ? 'active' : ''}
            onClick={() => setActiveTab('children')}
          >
            👶 Mes Enfants
          </button>
          <button 
            className={activeTab === 'grades' ? 'active' : ''}
            onClick={() => setActiveTab('grades')}
          >
            📊 Notes
          </button>
          <button 
            className={activeTab === 'payments' ? 'active' : ''}
            onClick={() => setActiveTab('payments')}
          >
            💳 Paiements
          </button>
          <button 
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages
          </button>
        </div>

        <div className="main-content">
          {activeTab === 'children' && (
            <div className="tab-content">
              <h2>Mes Enfants</h2>
              <div className="children-list">
                {children.length > 0 ? (
                  children.map(child => (
                    <div key={child._id} className="child-card" onClick={() => setSelectedChild(child)}>
                      <h3>{child.userId?.name}</h3>
                      <p>Classe: {child.classLevel}</p>
                      <p>Matricule: {child.matricule}</p>
                    </div>
                  ))
                ) : (
                  <p>Aucun enfant enregistré</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="tab-content">
              <h2>Notes des Enfants</h2>
              {selectedChild && (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Matière</th>
                      <th>Note</th>
                      <th>Trimestre</th>
                      <th>Commentaires</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.length > 0 ? (
                      grades.map(grade => (
                        <tr key={grade._id}>
                          <td>{grade.subject}</td>
                          <td>{grade.score}/100</td>
                          <td>{grade.term}</td>
                          <td>{grade.comments}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4">Aucune note</td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="tab-content">
              <h2>Paiements de Scolarité</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Enfant</th>
                    <th>Montant</th>
                    <th>Trimestre</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map(payment => (
                      <tr key={payment._id}>
                        <td>{payment.studentId?.userId?.name}</td>
                        <td>{payment.amount}€</td>
                        <td>{payment.term}</td>
                        <td><span className={`status ${payment.status}`}>{payment.status}</span></td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4">Aucun paiement</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;
