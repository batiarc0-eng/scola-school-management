import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard({ user, onLogout }) {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [activeTab, setActiveTab] = useState('students');
  const [newStudent, setNewStudent] = useState({ name: '', matricule: '', classLevel: '', parentId: '' });
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      // Load all data
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Add student
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Add teacher
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">Scola - Contrôleur</div>
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
            👥 Gestion Élèves
          </button>
          <button 
            className={activeTab === 'teachers' ? 'active' : ''}
            onClick={() => setActiveTab('teachers')}
          >
            👨‍🏫 Gestion Enseignants
          </button>
          <button 
            className={activeTab === 'payments' ? 'active' : ''}
            onClick={() => setActiveTab('payments')}
          >
            💳 Paiements
          </button>
          <button 
            className={activeTab === 'reports' ? 'active' : ''}
            onClick={() => setActiveTab('reports')}
          >
            📊 Rapports
          </button>
        </div>

        <div className="main-content">
          {activeTab === 'students' && (
            <div className="tab-content">
              <h2>Gestion des Élèves</h2>
              
              <div className="form-section">
                <h3>Ajouter un Élève</h3>
                <form onSubmit={handleAddStudent} className="admin-form">
                  <div className="form-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Matricule</label>
                    <input
                      type="text"
                      value={newStudent.matricule}
                      onChange={(e) => setNewStudent({...newStudent, matricule: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Classe</label>
                    <input
                      type="text"
                      value={newStudent.classLevel}
                      onChange={(e) => setNewStudent({...newStudent, classLevel: e.target.value})}
                      required
                    />
                  </div>
                  <button type="submit">Ajouter Élève</button>
                </form>
              </div>

              <div className="data-section">
                <h3>Liste des Élèves</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Matricule</th>
                      <th>Classe</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? (
                      students.map(student => (
                        <tr key={student._id}>
                          <td>{student.userId?.name}</td>
                          <td>{student.matricule}</td>
                          <td>{student.classLevel}</td>
                          <td>{student.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4">Aucun élève</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'teachers' && (
            <div className="tab-content">
              <h2>Gestion des Enseignants</h2>
              
              <div className="form-section">
                <h3>Ajouter un Enseignant</h3>
                <form onSubmit={handleAddTeacher} className="admin-form">
                  <div className="form-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                    />
                  </div>
                  <button type="submit">Ajouter Enseignant</button>
                </form>
              </div>

              <div className="data-section">
                <h3>Liste des Enseignants</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.length > 0 ? (
                      teachers.map(teacher => (
                        <tr key={teacher._id}>
                          <td>{teacher.name}</td>
                          <td>{teacher.email}</td>
                          <td>{teacher.phone}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="3">Aucun enseignant</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
