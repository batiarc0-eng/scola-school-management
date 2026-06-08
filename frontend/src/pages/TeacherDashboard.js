import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TeacherDashboard.css';

function TeacherDashboard({ user, onLogout }) {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('students');
  const [newGrade, setNewGrade] = useState({ subject: '', score: '', term: '', comments: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadTeacherData();
  }, []);

  const loadTeacherData = async () => {
    try {
      const token = localStorage.getItem('token');
      // Load students and grades
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleAddGrade = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Add grade
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">Scola - Enseignant</div>
        <div className="navbar-info">
          <span>Bienvenue, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="sidebar">
          <button 
            className={activeTab === 'students' ? 'active' : ''}
            onClick={() => setActiveTab('students')}
          >
            👥 Mes Élèves
          </button>
          <button 
            className={activeTab === 'grades' ? 'active' : ''}
            onClick={() => setActiveTab('grades')}
          >
            📝 Saisir Notes
          </button>
          <button 
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages
          </button>
        </div>

        <div className="main-content">
          {activeTab === 'students' && (
            <div className="tab-content">
              <h2>Mes Élèves</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Classe</th>
                    <th>Matricule</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map(student => (
                      <tr key={student._id}>
                        <td>{student.userId?.name}</td>
                        <td>{student.classLevel}</td>
                        <td>{student.matricule}</td>
                        <td>{student.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4">Aucun élève</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="tab-content">
              <h2>Saisir les Notes</h2>
              <form onSubmit={handleAddGrade} className="grade-form">
                <div className="form-group">
                  <label>Élève</label>
                  <select value={selectedStudent?._id || ''} onChange={(e) => {
                    const student = students.find(s => s._id === e.target.value);
                    setSelectedStudent(student);
                  }}>
                    <option value="">-- Sélectionner --</option>
                    {students.map(student => (
                      <option key={student._id} value={student._id}>
                        {student.userId?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Matière</label>
                  <input
                    type="text"
                    value={newGrade.subject}
                    onChange={(e) => setNewGrade({...newGrade, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Note</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newGrade.score}
                    onChange={(e) => setNewGrade({...newGrade, score: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Trimestre</label>
                  <input
                    type="text"
                    value={newGrade.term}
                    onChange={(e) => setNewGrade({...newGrade, term: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Commentaires</label>
                  <textarea
                    value={newGrade.comments}
                    onChange={(e) => setNewGrade({...newGrade, comments: e.target.value})}
                  />
                </div>
                <button type="submit">Ajouter la Note</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
