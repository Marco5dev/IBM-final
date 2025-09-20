const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { connectToDatabase, getCollection } = require('../models/db');
const { ObjectId } = require('mongodb');

// Simple multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Ensure DB connected middleware
async function ensureDb(req, res, next) {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    next(err);
  }
}

// GET all items
router.get('/', ensureDb, async (req, res, next) => {
  try {
    const col = getCollection('secondChanceItems');
    const items = await col.find({}).toArray();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// GET by id
router.get('/:id', ensureDb, async (req, res, next) => {
  try {
    const id = req.params.id;
    const col = getCollection('secondChanceItems');
    const item = await col.findOne({ _id: new ObjectId(id) });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST create new item (supports file upload)
router.post('/', ensureDb, upload.single('image'), async (req, res, next) => {
  try {
    const col = getCollection('secondChanceItems');
    const payload = req.body || {};
    if (req.file) {
      payload.imageUrl = `/uploads/${req.file.filename}`;
    }
    payload.createdAt = new Date();
    const result = await col.insertOne(payload);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    next(err);
  }
});

// DELETE by id
router.delete('/:id', ensureDb, async (req, res, next) => {
  try {
    const id = req.params.id;
    const col = getCollection('secondChanceItems');
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
