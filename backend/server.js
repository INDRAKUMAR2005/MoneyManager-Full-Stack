const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const mongoose = require('mongoose'); // Added mongoose import

dotenv.config();

const app = express();

// Connect to Database (handled in middleware for serverless/Vercel)
// connectDB().catch(err => console.error("Database Connection Error:", err));

// Middleware
app.use(express.json());
app.use(cors()); // Allow all origins by default

// Middleware to ensure Database is Connected before handling requests
app.use(async (req, res, next) => {
    if (mongoose.connection.readyState === 1) {
        return next();
    }
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database Connection Error in Middleware:", error);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// Routes
const transactions = require('./routes/transactions');
app.use('/api/v1/transactions', transactions);

app.get('/', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.send('API is running... (DB Connected)');
    } else {
        res.status(500).send(`API Error: Database not connected. State: ${mongoose.connection.readyState}`);
    }
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
}

module.exports = app;
