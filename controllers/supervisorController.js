const Supervisor = require('../models/supervisor');
const Issue = require('../models/issue');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const supervisorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const supervisor = await Supervisor.findByEmail(email);
        if (!supervisor) return res.status(400).json({ message: 'Incorrect credentials' });

        const validPassword = await bcrypt.compare(password, supervisor.password);
        if (!validPassword) return res.status(401).json({ message: 'Incorrect Password' });

        const [roleResult] = await db.query('SELECT roleName FROM roles WHERE roleID = ?', [supervisor.roleID]);
        const roleName = roleResult[0].roleName;

        const token = jwt.sign(
            { id: supervisor.empID, roleName: roleName },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.header('Authorization', token).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resolveIssue = async (req, res) => {
    const { issueID, dateResolved } = req.body;
    const supervisorID = req.user.empID;

    try {
        const issue = await Issue.findByPk(issueID);
        if (!issue) return res.status(404).json({ message: 'Issue not found' });

        console.log(`Assigned Supervisor ID: ${issue.assignedSupervisorID}`);
        console.log(`Supervisor ID: ${supervisorID}`);

        if (issue.assignedSupervisorID !== supervisorID) {
            return res.status(403).json({ message: 'Unauthorized to resolve this issue' });
        }

        await db.query('UPDATE issue SET status = ?, dateResolved = ? WHERE issueID = ?', ['Resolved', dateResolved, issueID]);

        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getResolvedIssues = async (req, res) => {
    try {
        const issues = await Issue.getResolvedIssues();
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAssignedIssues = async (req, res) => {
    const empID = req.user.id;

    try {
        const [assignments] = await db.query('SELECT * FROM assignment WHERE TechnicianID = ?', [empID]);
        if (!assignments.length) {
            return res.status(404).json({ message: 'No issue has been assigned yet' });
        }

        const [issues] = await db.query('SELECT * FROM issue WHERE assignedSupervisorID = ?', [empID]);
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    supervisorLogin,
    resolveIssue,
    getResolvedIssues,
    getAssignedIssues
};
