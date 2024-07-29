const Issue = require('../models/Issue');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const logIssue = async (req, res) => {
    const { description } = req.body;
    const file = req.file;

    if (!description) {
        return res.status(400).json({ message: 'Provide issue description.' });
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const residentId = decodedToken.residentId;

        const newIssue = new Issue(residentId, description, file);
        await newIssue.save();
        res.status(201).json({ message: 'Issue logged successfully.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { logIssue };
