const db = require('../config/db');

class Notification {
    constructor(userID, message) {
        this.userID = userID;
        this.message = message;
        this.dateSent = new Date();
        this.readStatus = false
    }

    async save() {
        const [results] = await db.query('INSERT INTO notification (userID, message, dateSent, readStatus) VALUES (?,?,?,?)',
            [this.userID, this.message, this.dateSent, this.readStatus]
        );
        return results;
    }


}

module.exports = Notification;