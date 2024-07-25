const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(name, surname, address, email, contact, password) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.email = email;
        this.contact = contact;
        this.password = password;
    }

    
    async save() {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;

        await db.query(
            'INSERT INTO residents (name, surname, address, email, contact, password) VALUES (?, ?, ?, ?, ?, ?)',
            [this.name, this.surname, this.address, this.email, this.contact, this.password]
        );
    }

   
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM residents WHERE email = ?', [email]);
        if (rows.length > 0) {
            const { name, surname, address, email, contact, password } = rows[0];
            return new User(name, surname, address, email, contact, password);
        }
        return null;
    }

     async matchPassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}

module.exports = User;