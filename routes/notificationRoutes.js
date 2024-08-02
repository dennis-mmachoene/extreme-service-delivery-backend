const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');

// Notification routes
router.get('/', [auth], notificationController.getNotifications);
router.post('/', [auth], notificationController.sendNotification);

module.exports = router;
