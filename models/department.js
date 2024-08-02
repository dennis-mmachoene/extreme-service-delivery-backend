const db = require('../config/db');

class Department {
    constructor(deptID, dept_name) {
        this.deptID = deptID;
        this.dept_name = dept_name;
        
    }

    async save() {
        const [results] = await db.query(
            'INSERT INTO department (deptID, dept_name) VALUES (?, ?)',
        [this.deptID, this.dept_name]);
        return results;
    }
}

module.exports = Department;