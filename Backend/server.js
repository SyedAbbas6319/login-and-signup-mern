const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');

// Initialize Express app
const app = express();
const JWT_SECRET = 'aS3cUr3$eCReTKey12!@#45678wxyz';

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// MongoDB connection
mongoose.connect('mongodb+srv://syedabbas6319:syedabbas6319@cluster0.5vgjrp1.mongodb.net/task2?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    basePassword: { type: String, required: true },
    password: { type: String, required: true } // This stores the hashed password for the day
});

const User = mongoose.model('User', userSchema);

// Function to update passwords daily
const updatePasswordsDaily = async () => {
    const users = await User.find();
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    users.forEach(async user => {
        const newPassword = user.basePassword + today;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
    });
};

// Schedule the password update function to run at midnight daily
cron.schedule('0 0 * * *', () => {
    updatePasswordsDaily().then(() => console.log('Passwords updated for the day.'));
});

// JWT Authentication middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user;
        next();
    });
};

// Routes
app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    console.log('Register request:', req.body);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const newPassword = password + today;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const newUser = new User({ name, email, basePassword: password, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error', err);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Login request:', req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const fullPassword = password + today;
        const isPasswordValid = await bcrypt.compare(fullPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        console.error('Login error', err);
        res.status(500).json({ message: 'Login failed. Please try again.' });
    }
});

app.get('/protected/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected dashboard!' });
});

// Export the app (for Vercel)
module.exports = app;
