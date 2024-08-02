const Resident = require('../models/resident');
const Issue = require('../models/issue');
const Feedback = require('../models/feedback');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
require('dotenv').config();

const registerResident = async (req, res) => {
    const { name, surname, address, email, contact, password } = req.body;

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        let roleID;
        const [rows] = await db.query('SELECT roleID FROM roles WHERE roleName = ?',
            ['Resident']
        );

        roleID = rows[0].roleID;

        const resident = new Resident(name, surname, address, email, contact, hashedPwd, roleID);

        await resident.save();
        res.status(201).json(resident);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const residentLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const resident = await Resident.findByEmail(email);
   
        if (!resident) return res.status(404).json({ message: 'Incorrect login credentials' });

        const validPassword = await bcrypt.compare(password, resident.password);

        if (!validPassword) return res.status(401).json({ message: 'Incorrect Password' });

        const [roleRows] = await db.query('SELECT roleName FROM roles WHERE roleID = ?', [resident.roleID]);
        const roleName = roleRows.length > 0 ? roleRows[0].roleName : null;

        if (!roleName) return res.status(500).json({ message: 'Role not found' });

        const token = jwt.sign(
            { id: resident.userID, roleName: roleName },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.header('Authorization', `Bearer ${token}`).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};
const reportIssue = async (req, res) => {
    const { description } = req.body;

    const residentID = req.user.id;
    const mediaFile = null;

    const issue = new Issue(residentID, description, mediaFile);

    try {
        await issue.save();
        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
}

const giveFeedback = async (req, res) => {
    const { issueID, comments, rating } = req.body;
    const residentID = req.user.id;

    try {
        const feedback = new Feedback(issueID, residentID, comments, rating);

        await feedback.save();
        res.status(200).json(feedback)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerResident,
    residentLogin,
    reportIssue,
    giveFeedback
}