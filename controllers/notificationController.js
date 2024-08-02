const Notification = require('../models/notification');

exports.getNotifications = async (req, res) => {
  const userID = req.user.id;

  try {
    const notifications = await Notification.findAll({ where: { userID } });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendNotification = async (req, res) => {
  const { userID, message } = req.body;

  try {
    const notification = await Notification.create({
      userID,
      message,
      dateSent: new Date(),
      readStatus: false
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
