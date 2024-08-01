const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic GET endpoint
app.get('/', (req, res) => {
    res.send('Admin window');
});

// Start the server
app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});

const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ExSD_db'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// POST: Add a new resident
app.post('/api/residents', (req, res) => {
    const { name, surname, address, email, contact, password } = req.body;
    const sql = `INSERT INTO residents (name, surname, address, email, contact, password) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, surname, address, email, contact, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Resident added successfully', residentID: result.insertId });
    });
});

// POST: Add a new technician supervisor
app.post('/api/techniciansupervisors', (req, res) => {
    const { empID, name, surname, email, contact, specialization, password } = req.body;
    const sql = `INSERT INTO techniciansupervisor (empID, name, surname, email, contact, specialization, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [empID, name, surname, email, contact, specialization, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Technician Supervisor added successfully', ID: result.insertId });
    });
});

// POST: Add a new department manager
app.post('/api/deptmanagers', (req, res) => {
    const { empID, name, surname, email, contact, deptID, password } = req.body;
    const sql = `INSERT INTO deptmanager (empID, name, surname, email, contact, deptID, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [empID, name, surname, email, contact, deptID, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Department Manager added successfully', ID: result.insertId });
    });
});

// GET: Retrieve all residents
app.get('/api/residents', (req, res) => {
    const sql = 'SELECT * FROM residents';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// GET: Retrieve all residents
app.get('/api/residents', (req, res) => {
    const sql = 'SELECT * FROM residents';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// PUT: Update an existing resident
app.put('/api/residents/:id', (req, res) => {
    const { name, surname, address, email, contact, password } = req.body;
    const sql = `UPDATE residents SET name = ?, surname = ?, address = ?, email = ?, contact = ?, password = ? WHERE userID = ?`;

    db.query(sql, [name, surname, address, email, contact, password, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Resident updated successfully' });
    });
});

// DELETE: Remove a resident by ID
app.delete('/api/residents/:id', (req, res) => {
    const sql = `DELETE FROM residents WHERE userID = ?`;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Resident deleted successfully' });
    });
});
