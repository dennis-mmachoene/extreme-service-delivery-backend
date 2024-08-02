const db = require('../config/db');

class Admin {
    constructor(name, email, password, roleID) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.roleID = roleID;
    }

    async save() {
        const [results] = await db.query('INSERT INTO admin (name, email, password, roleID) VALUES (?, ?, ?, ?)',[this.name, this.email, this.password, this.roleID]);
        return results;
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM admin WHERE email = ?', [email]);
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    }
}


module.exports = Admin;