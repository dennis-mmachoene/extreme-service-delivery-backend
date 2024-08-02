const DeptManager = require('../models/deptmanager');
const Assignment = require('../models/assignment');
const Issues = require('../models/issue');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db')

const assignIssue = async (req, res) => {
    const { issueID, TechnicianID } = req.body;

    try {
        const managerID = req.user.id;

       
        const [issueRows] = await db.query('SELECT * FROM issue WHERE issueID = ?', [issueID]);

        if (issueRows.length === 0) {
            return res.status(404).json({ message: 'Issue not found' });
        }

    
        const assignment = new Assignment(issueID, TechnicianID, managerID);
        await assignment.save();

     
        await db.query('UPDATE issue SET assignedSupervisorID = ? WHERE issueID = ?', [TechnicianID, issueID]);

        res.status(201).json(assignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const managerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const manager = await DeptManager.findByEmail(email);

        if (!manager) return res.status(400).json({ message: 'Incorrect credentials' });
        console.log('Manager found:', manager);

        console.log(manager.password)

        const validPassword = await bcrypt.compare(password, manager.password);

        if (!validPassword) return res.status(401).json({ message: 'Incorrect password' });

        const [roleRows] = await db.query('SELECT roleName FROM roles WHERE roleID = ?', [manager.roleID]);
        if (roleRows.length === 0) {
            return res.status(500).json({ message: 'Role not found for the manager' });
        }

        const roleName = roleRows[0].roleName;
        console.log('Role name:', roleName);

        const token = jwt.sign(
            { id: manager.empID, roleName: roleName }, // Corrected manager ID field
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.header('Authorization', token).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
}

const getReportedIssues = async (req, res) => {
    try{
        const issues = await Issues.findAll();
        res.status(201).json(issues);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    assignIssue, managerLogin, getReportedIssues
}