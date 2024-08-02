const db = require('../config/db');

class Supervisor {
    constructor(empID, name, surname, email, contact, specialization, password, roleID) {
        this.empID = empID;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.contact = contact;
        this.specialization = specialization;
        this.password = password;
        this.roleID = roleID;
    }

    async save () {
        const [results] = await db.query('INSERT INTO techniciansupervisor (empID, name, surname, email, contact, specialization, password, roleID) VALUES (?,?,?,?,?,?,?,?)',
            [this.empID, this.name, this.surname, this.email, this.contact, this.specialization, this.password, this.roleID]
        );
        return results;
    }

    static async findBySpeciality(specialization) {
        const [rows] = await db.query('SELECT * FROM techniciansupervisor WHERE specialization =?', [specialization]);
        return rows;
    }
    static async findByEmail (email) {
        const [rows] = await db.query('SELECT * FROM  techniciansupervisor WHERE email = ?',[email]);
        return rows[0];
    }
}

module.exports = Supervisor;