const express = require('express');
const router = express.Router();
const residentController = require('../controllers/residentController');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');

// Resident routes
router.post('/register', residentController.registerResident);
router.post('/login', residentController.residentLogin);
router.post('/report-issue', [auth, role('Resident')], residentController.reportIssue);
router.post('/give-feedback', [auth, role('Resident')], residentController.giveFeedback);

module.exports = router;
