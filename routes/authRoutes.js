const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { connectToDatabase, getCollection } = require('../models/db');

async function ensureDb(req, res, next) {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    next(err);
  }
}

// Register
router.post('/register', ensureDb, async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const users = getCollection('users');
    const existing = await users.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(409).json({ error: 'User exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = { username, email, password: hash, createdAt: new Date() };
    const result = await users.insertOne(user);
    res.status(201).json({ userId: result.insertedId, username });
  } catch (err) {
    next(err);
  }
});

// Login (returns basic user data; for frontend store in localStorage)
router.post('/login', ensureDb, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
    const users = getCollection('users');
    const user = await users.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid' });
    res.json({ userId: user._id, username: user.username });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
