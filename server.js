const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/authRoutes');
const app = express();
const dbConnection = require('./config/database');
require('dotenv').config();

dbConnection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)
});