const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        let existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists' 
            });
        }
        
        // Create new user
        const user = new User({
            username,
            email,
            password
        });
        
        await user.save();
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        
        res.status(201).json({ 
            message: 'User registered successfully', 
            token 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Registration failed', 
            error: error.message 
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user and validate credentials
        const user = await User.findByCredentials(username, password);
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        
        res.json({ 
            message: 'Login successful', 
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(401).json({ 
            message: 'Authentication failed', 
            error: error.message 
        });
    }
};