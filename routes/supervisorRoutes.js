const express = require('express');
const router = express.Router();
const supervisorController = require('../controllers/supervisorController');
const auth = require('../middleware/auth');
const role = require('../middleware/roles');

router.post('/login', supervisorController.supervisorLogin);
router.post('/resolve-issue', [auth, role('Supervisor')], supervisorController.resolveIssue);
router.get('/resolved-issues', [auth, role('Supervisor')], supervisorController.getResolvedIssues);
router.get('/assigned-issues', [auth, role('Supervisor')], supervisorController.getAssignedIssues);

module.exports = router;
