const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 6969;

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

// Session store
const store = new MongoDBStore({
    uri: 'mongodb+srv://syedabbas6319:syedabbas6319@cluster0.5vgjrp1.mongodb.net/task2?retryWrites=true&w=majority',
    collection: 'sessions'
});

store.on('error', (error) => {
    console.log(error);
});

// Session middleware
app.use(session({
    secret: 'd919bea4d2803f948e303063bb5e5136b86723ce6230d4cc4bd20d793204692adc74e54aea690a2634b9eddf1d15dd8a0589947a404d429de5fc2ad25981',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// User schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Authentication middleware
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Routes
app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error', err);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        req.session.user = user;
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Login error', err);
        res.status(500).json({ message: 'Login failed. Please try again.' });
    }
});

app.get('/protected/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected dashboard!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
