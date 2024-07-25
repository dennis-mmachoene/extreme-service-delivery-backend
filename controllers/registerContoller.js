const User = require('../models/userModel'); // Adjust the path as needed

const createAccount = async (req, res) => {
    const { name, surname, address, email, contacts, password } = req.body;

    // Check if all fields are provided
    if (!name || !surname || !address || !email || !contacts || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const userExist = await User.findByEmail(email);

        if (userExist) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create a new user and save to the database
        const newUser = new User(name, surname, address, email, contacts, password);
        await newUser.save();

        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = createAccount;

