const Admin = require('../models/admin');
const DeptManager = require('../models/deptmanager');
const Department = require('../models/department');
const Supervisor = require('../models/supervisor');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    let roleID;
    const [rows] = await db.query('SELECT roleID FROM roles WHERE roleName = ?',
        ['Admin']
    );

    roleID = rows[0].roleID;

    const hashedPwd = await bcrypt.hash(password, 10);

    const admin = new Admin(name, email, hashedPwd, roleID);

    try {
      await admin.save();
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminExist = await Admin.findByEmail(email);

        if (!adminExist) return res.status(400).json({ message: 'Admin does not exist' });
        console.log(adminExist);

        const validPassword = await bcrypt.compare(password, adminExist.password);
        if (!validPassword) return res.status(401).json({ message: 'Incorrect password' });

        const [roleRows] = await db.query('SELECT roleName FROM roles WHERE roleID = ?', [adminExist.roleID]);
        const roleName = roleRows.length > 0 ? roleRows[0].roleName : null;

        if (!roleName) return res.status(500).json({ message: 'Role not found' });

        const token = jwt.sign(
            { id: adminExist.adminID, roleName: roleName },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.header('Authorization', `Bearer ${token}`).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

const addManager = async (req, res) => {
    const {empID, name, surname, email, contact, deptID, password} = req.body;

    let roleID;
    const [rows] = await db.query('SELECT roleID FROM roles WHERE roleName = ?',
        ['Manager']
    );

    roleID = rows[0].roleID;
    
    const hashedPwd = await bcrypt.hash(password, 10);
    const manager = new DeptManager(empID, name, surname, email, contact, deptID, hashedPwd, roleID);
    try{
        await manager.save();
        res.status(201).json(manager);
    }catch(error) {
        res.status(500).json({ error: error.message})
    }
}

const addTechnician = async (req, res) => {
   const { empID, name, surname, email, contact, specialization, password } = req.body;

   const hashedPwd = await bcrypt.hash(password, 10);
   let roleID;
    const [rows] = await db.query('SELECT roleID FROM roles WHERE roleName = ?',
        ['Supervisor']
    );

    roleID = rows[0].roleID;

    const supervisor = new Supervisor(empID, name, surname, email, contact, specialization, hashedPwd, roleID);

    try{
        await supervisor.save();
        res.status(201).json(supervisor);
    }catch (error) {
       res.status(500).json({ error: error.message });
    }
}

const addDepartment = async (req, res) => {
    const {deptID, dept_name } = req.body;
   
    const dept = new Department(deptID, dept_name);

    try{
        await dept.save();
        res.status(201).json(dept);
    }catch(error) {
        res.status(500).json({ error: error.message});
    }

}

module.exports = {
    registerAdmin,
    loginAdmin,
    addManager,
    addTechnician,
    addDepartment
}