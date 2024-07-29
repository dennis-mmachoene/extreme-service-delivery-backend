const db = require('../config/database');

class Resident {
    constructor (name, surname, address, email, contact, password) {
        this.name = name;
        this.surname = surname;
        this.address = address; 
        this.email = email;
        this.contact =contact;
        this.password = password;
    }

    async save () {
        const [result] = await db.query(
            'INSERT INTO residents (name, surname, address, email, contact, password) VALUES (?, ?, ?, ?, ?, ?)',
            [this.name, this.surname, this.address, this.email, this.contact, this.password]
        )
        return result;
    }

    static async findByEmail (email) {
        const [rows] = await db.query('SELECT * FROM residents WHERE email =?', [email]);
        return rows[0];
    }
}

module.exports = Resident;