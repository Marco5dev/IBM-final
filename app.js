const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const itemsRoutes = require('./routes/secondChanceItemsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

// Serve uploads and public static frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/secondchance/items', itemsRoutes);
app.use('/api/secondchance/search', searchRoutes);
app.use('/api/secondchance/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SecondChance backend running' });
});

app.listen(port, () => {
  console.log(`SecondChance backend listening on port ${port}`);
});

module.exports = app;
