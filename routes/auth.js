const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Halaman login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Proses login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// Halaman register
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// Proses register
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Check username sudah terdaftar
    const userExists = await User.findOne(username);
    if (userExists) {
      req.flash('error', 'Username sudah terdaftar');
      return res.redirect('/auth/register');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Buat user baru
    await User.create({
      username,
      password: hashedPassword,
      role: role || 'user'
    });
    
    req.flash('success', 'Registrasi berhasil, silakan login');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error during registration:', error);
    req.flash('error', 'Terjadi kesalahan saat registrasi');
    res.redirect('/auth/register');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
    }
    res.redirect('/');
  });
});

module.exports = router; 