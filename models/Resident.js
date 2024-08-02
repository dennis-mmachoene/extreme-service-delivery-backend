const db = require('../config/db')

class Resident {
    constructor(name, surname, address, email, contact, password, roleID) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.email = email;
        this.contact = contact;
        this.password = password;
        this.roleID = roleID;
    }

    async save() {
        const [results] = await db.query(
            'INSERT INTO residents (name, surname, address, email, contact, password, roleID) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.name, this.surname, this.address, this.email, this.contact, this.password, this.roleID]
        );
        return results;
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM residents WHERE email = ?', [email]);
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = Resident;