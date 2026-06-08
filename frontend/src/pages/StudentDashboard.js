import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

function StudentDashboard({ user, onLogout }) {
  const [grades, setGrades] = useState([]);
  const [payments, setPayments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('grades');
  const navigate = useNavigate();

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      const token = localStorage.getItem('token');
      // Load grades, payments, and messages
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
        <div className="navbar-brand">Scola - Élève</div>
        <div className="navbar-info">
          <span>Bienvenue, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="sidebar">
          <button 
            className={activeTab === 'grades' ? 'active' : ''}
            onClick={() => setActiveTab('grades')}
          >
            📊 Mes Notes
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
          {activeTab === 'grades' && (
            <div className="tab-content">
              <h2>Mes Notes</h2>
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
                    <tr><td colSpan="4">Aucune note pour le moment</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="tab-content">
              <h2>Paiements de Scolarité</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Montant</th>
                    <th>Type</th>
                    <th>Trimestre</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map(payment => (
                      <tr key={payment._id}>
                        <td>{payment.amount}€</td>
                        <td>{payment.paymentType}</td>
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

          {activeTab === 'messages' && (
            <div className="tab-content">
              <h2>Mes Messages</h2>
              <div className="messages-list">
                {messages.length > 0 ? (
                  messages.map(msg => (
                    <div key={msg._id} className="message-item">
                      <h4>{msg.subject}</h4>
                      <p>{msg.message}</p>
                    </div>
                  ))
                ) : (
                  <p>Aucun message</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
