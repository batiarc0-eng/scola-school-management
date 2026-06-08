const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const ADMIN_PASSWORD = '214977';

// Login
router.post('/login', async (req, res) => {
  try {
    const { name, password, role } = req.body;

    // Admin login
    if (role === 'admin') {
      if (password === ADMIN_PASSWORD) {
        const token = jwt.sign(
          { id: 'admin', role: 'admin', name: 'Admin' },
          process.env.JWT_SECRET || 'secret_key'
        );
        return res.json({
          success: true,
          token,
          user: { id: 'admin', role: 'admin', name: 'Admin' }
        });
      } else {
        return res.status(401).json({ success: false, message: 'Mot de passe incorrect' });
      }
    }

    // Other roles login (teacher, parent, student)
    let user = await User.findOne({ name, role });
    
    if (!user) {
      // Create user if doesn't exist
      user = new User({ name, role });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'secret_key'
    );

    res.json({
      success: true,
      token,
      user: { id: user._id, role: user.role, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

module.exports = router;
