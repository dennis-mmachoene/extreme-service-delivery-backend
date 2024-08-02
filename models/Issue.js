const db = require('../config/db');
const path = require('path');

class Issue {
    constructor(residentID, description, mediaFile) {
        this.residentID = residentID;
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
            'INSERT INTO issue (residentID, description, status, mediaUrl, dateReported) VALUES (?, ?, ?, ?, ?)',
            [this.residentID, this.description, this.status, mediaUrl, this.dateReported]
        );
        return result;
    }
    static async findAll() {
        const [rows] = await db.query(
            'SELECT * FROM issue'
        );
        return rows;
    }
    static async findByPk(id) {
        const [rows] = await db.query('SELECT * FROM issue WHERE issueID = ?', [id]);
        return rows;
    }
    static async getResolvedIssues() {
        const [rows] = await db.query('SELECT * FROM issue WHERE status =?', ['Resolved']);
        return rows;
    }
}

module.exports = Issue;