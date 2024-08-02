const db = require('../config/db');

class DeptManager {
    constructor ( empID, name, surname, email, contact, deptID, password, roleID){
        this.empID = empID;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.contact = contact;
        this.deptID = deptID;
        this.password = password;
        this.roleID = roleID;
    }
    async save () {
     const [results] = await db.query(
        'INSERT INTO deptmanager (empID, name, surname, email, contact, deptID, password, roleID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [this.empID, this.name, this.surname, this.email, this.contact, this.deptID, this.password, this.roleID]
     );
     return results;
    }

    static async getManager(id) {
        const [rows] = await db.query(
            'SELECT * FROM deptmanager WHERE empID = ?',[id]
        );
        return rows[0];
        
    }
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM deptmanager WHERE email = ?', [email]);
        return rows[0];
    }
}

module.exports = DeptManager;