const db = require('../config/database');
const path = require('path');

class Issue {
    constructor(residentId, description, mediaFile) {
        this.residentId = residentId;
        this.description = description;
        this.status = 'Pending';
        this.mediaFile = mediaFile;
        this.dateReported = new Date();
    }

    async save() {
        let mediaUrl = null;

        if (this.mediaFile) {
            mediaUrl = path.join(__dirname, 'uploads', this.mediaFile.filename);
        }

        const [result] = await db.query(
            'INSERT INTO issue (residentId, description, status, mediaUrl, dateReported) VALUES (?, ?, ?, ?, ?)',
            [this.residentId, this.description, this.status, mediaUrl, this.dateReported]
        );
        return result;
    }
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM issue');
        return rows;
    }
}

module.exports = Issue;