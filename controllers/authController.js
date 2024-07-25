const User = require('../models/userModel');
const bcrypt = require('bcryptjs');


const createAccount = async (req, res) => {
    const { name, surname, address, email, contact, password } = req.body;

    if (!name || !surname || !address || !email || !contact || !password) {
        res.status(400).json({ message: 'All fields are required.' });
        return;
    }
    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            res.status(409).json({ message: 'User already exists.' });
            return;
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({
            "name": name,
            "surname": surname,
            "address": address,
            "email": email,
            "contact": contact,
            "password": hashedPwd
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: 'Account was created'
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }


}
const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    try{ 
        const user = await User.findOne({ email }).exec();

        if(!user) {
            res.status(401).json({ message: 'User does not exist'})
        return;
        }

        const pwdMatch = await bcrypt.compare(password, user.password);

        if(!pwdMatch) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }
        res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            message: 'Login was successful'
        });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error'});
    }
}

module.exports = { createAccount, login };