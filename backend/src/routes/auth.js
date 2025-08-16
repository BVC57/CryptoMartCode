const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// register
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if(!username || !email || !password) return res.status(400).json({error:'missing fields'});
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({error:'email exists'});
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, passwordHash });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch(err){ next(err); }
});

// login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({error:'missing fields'});
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({error:'invalid credentials'});
    const ok = await user.verifyPassword(password);
    if(!ok) return res.status(400).json({error:'invalid credentials'});
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch(err){ next(err); }
});

module.exports = router;
