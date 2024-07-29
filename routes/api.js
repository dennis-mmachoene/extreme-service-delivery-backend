const express = require('express');
const router = express.Router();
const residentsController = require('../controllers/residentController');
const issueController = require('../controllers/issueController');

router.post('/register', residentsController.register);
router.post('/login', residentsController.login);

router.post('/issues', issueController.logIssue);

module.exports = router;