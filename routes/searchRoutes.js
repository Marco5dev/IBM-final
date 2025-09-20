const express = require('express');
const router = express.Router();
const { connectToDatabase, getCollection } = require('../models/db');

router.get('/', async (req, res, next) => {
  try {
    await connectToDatabase();
    const col = getCollection('secondChanceItems');
    const { category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };
    const items = await col.find(filter).toArray();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
