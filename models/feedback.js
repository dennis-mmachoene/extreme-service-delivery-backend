const db = require('../config/db');

class Feedback {
    constructor (issueID, residentID, comments, rating) {
        this.issueID = issueID;
        this.residentID = residentID;
        this.comments = comments;
        this.rating = rating;
        this.dateProvided = new Date();
    }

    async save () {
        const [results] = await db.query('INSERT INTO feedback (issueID, residentID, comments, rating, dateProvided) VALUES (?, ?, ?, ?, ?)',
            [this.issueID, this.residentID, this.comments, this.rating, this.dateProvided]
        );
        return results;
    }

    static async getFeedbacks (issueID) {
        const [rows] = await db.query('SELECT * FROM feedback WHERE issueID = ?',[issueID]);
        return rows;
    }
}

module.exports = Feedback;