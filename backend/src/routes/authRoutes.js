const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { validateUser, createUser, findUserByUsernameOrEmail } = require('../utils/userUtils');

// ============================================
// REGISTER - Create a new user
// ============================================
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, fullName, phoneNumber, company, role } = req.body;

        // Validate required fields
        if (!username || !email || !password || !fullName) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username, email, password, and fullName'
            });
        }

        // Create user
        const newUser = await createUser({
            username,
            email,
            password,
            fullName,
            phoneNumber: phoneNumber || '',
            company: company || '',
            role: role || 'customer'
        });

        // Create JWT token
        const token = jwt.sign(
            { 
                id: newUser.id, 
                username: newUser.username, 
                role: newUser.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: newUser
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// ============================================
// LOGIN - Authenticate user
// ============================================
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username/email and password'
            });
        }

        // Validate user credentials
        const user = await validateUser(username, password);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username/email or password'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username, 
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message
        });
    }
});

// ============================================
// GET USER PROFILE
// ============================================
router.get('/profile', async (req, res) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = findUserByUsernameOrEmail(decoded.username);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Don't return password
        const { password, ...userWithoutPassword } = user;

        res.json({
            success: true,
            user: userWithoutPassword
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message
        });
    }
});

// ============================================
// GET ALL USERS (Admin only)
// ============================================
router.get('/users', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user is admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        const { readUsers } = require('../utils/userUtils');
        const users = readUsers();
        
        // Remove passwords from all users
        const usersWithoutPasswords = users.map(({ password, ...user }) => user);

        res.json({
            success: true,
            users: usersWithoutPasswords
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error: ' + error.message
        });
    }
});

module.exports = router;