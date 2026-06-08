import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        name,
        password,
        role
      });

      if (response.data.success) {
        onLogin(response.data.user, response.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Scola</h1>
        <h2>Système de Gestion Scolaire</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Rôle</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Élève</option>
              <option value="teacher">Enseignant</option>
              <option value="parent">Parent</option>
              <option value="admin">Contrôleur</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez votre nom"
              required
            />
          </div>

          {role === 'admin' && (
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
