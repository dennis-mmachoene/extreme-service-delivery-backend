const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');

// Manager routes
router.post('/login', managerController.managerLogin);
router.post('/assign-issue', [auth, role('Manager')], managerController.assignIssue);
router.get('/issues', [auth, role('Manager')], managerController.getReportedIssues);

module.exports = router;
