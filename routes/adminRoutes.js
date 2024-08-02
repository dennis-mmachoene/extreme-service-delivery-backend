const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');

// Admin routes
router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.post('/add-manager', [auth, role('Admin')], adminController.addManager);
router.post('/add-supervisor', [auth, role('Admin')], adminController.addTechnician);
router.post('/add-department', [auth, role('Admin')], adminController.addDepartment);

module.exports = router;
