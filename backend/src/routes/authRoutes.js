const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createUser, validateUser } = require('../Utils/userUtils');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, fullName, role } = req.body;
        
        if (!username || !email || !password || !fullName) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const newUser = await createUser({
            username,
            email,
            password,
            fullName,
            role: role || 'customer'
        });

        const token = jwt.sign(
            { id: newUser.id, username: newUser.username, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ success: true, token, user: newUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username/email and password'
            });
        }

        const user = await validateUser(username, password);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username/email or password'
            });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ success: true, token, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;