const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

// Using cors
app.use(cors({
    domains: '*',
    methods: '*'
}));

// Parsing JSON format
app.use(express.json())

// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/newscover');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Handle routes
app.use('/user', require('./controllers/userController'));


// Handle 404 error 
app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status(404).json({error: err.message});
    next(res);
});
// Running the server
app.listen(port, () => console.log(`News Covers API is running on port ${port}!`));