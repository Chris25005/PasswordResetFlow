const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
    try {
         // get the name, email, password from request body
        const { name, email, password } = req.body;

        // check if the user already registered
        const existingUser = await User.findOne({ email });
        
         // if the user already exists, return an error
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

         const hashedPassword = await bcrypt.hash(password, 10);

         // create a new user
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        // save the user to the database
        await newUser.save();

        // return success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.ststus(500).json({ Message: 'Server error'});
    }

}

const loginUser = async (req, res) => {
    try {
        // get the email and password from request body
        const { email, password } = req.body;

        // check if the user exists
        const user = await User.findOne({ email });

        // if the user does not exist, return an error
        if (!user) {
            return res.status(400).json({ message: 'Invalid User' });
        }

        // check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // if the password is incorrect, return an error
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Incorrect Password' });
        }

         // generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


        // set the token in the response header for httpOnly cookie
        res.cookie('token', token, {httpOnly: true });

    
        // return success response
        res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const Me = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found or not logged in' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            secure: true,
            sameSite: 'none'
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    Me, 
    logout
}


