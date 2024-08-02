const db = require('../config/db');

class Assignment {
    constructor (issueID, TechnicianID, ManagerID) {
        this.issueID = issueID;
        this.TechnicianID = TechnicianID;
        this.ManagerID = ManagerID;
        this.dateAssigned = new Date();
    }

    async save() {
        const [results] = await db.query('INSERT INTO assignment (issueID, TechnicianID, ManagerID, DateAssigned) VALUES (?, ?, ?, ?)',
            [this.issueID, this.TechnicianID, this.ManagerID, this.dateAssigned]);
            return results;
    }

    static async findByTechnicianID (id) {
        const [rows] = await db.query('SELECT * FROM assignment WHERE TechnicianID = ?', [id]);
        return rows;
    } 
}

module.exports = Assignment;