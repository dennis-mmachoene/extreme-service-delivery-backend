const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Feedback routes
router.get('/', feedbackController.getFeedback);

module.exports = router;
