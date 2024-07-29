const Resident = require('../models/Resident');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config;

const register = async (req, res) => {
    const { name, surname, address, email, contact, password } = req.body;

    if (!name || !surname || !address || !email || !contact || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const residentExist = await Resident.findByEmail(email);
    console.log(residentExist);
    if (residentExist) {
        return res.status(409).json({ message: 'The account already exists try logging in.' });
    }

    const hashedPwd = await bcrypt.hash(password, 12);

    const resident = new Resident(name, surname, address, email, contact, hashedPwd);

    try {
        await resident.save();
        res.status(201).json({ message: 'Resident registered succesfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    try {
        const resident = await Resident.findByEmail(email);

        if (!resident) {
            return res.status(401).json({ message: 'Account does not exist.' });
        }

        const isPasswordValid = await bcrypt.compare(password, resident.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }
        const token = jwt.sign(
            { residentId: resident.userID },
            process.env.SECRET_KEY,
            { expiresIn: '30m' }
        );
        res.status(200).json({ token });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { register, login };