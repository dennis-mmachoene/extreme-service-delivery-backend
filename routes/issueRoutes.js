const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Issue routes
router.get('/:issueID', issueController.getIssueDetails);

module.exports = router;
