const expres = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// setting up express app and database connection
const app = expres();
const port = process.env.PORT || 4000;
const db = process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27017/mynewscover';

const mongoose = require('mongoose');
mongoose.set('strictQuery',false); // to stop showing the warning in the console
mongoose.connect(db,
    console.log('Connected to the database'));

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
const user = require('./controllers/userController')
app.use('/user',user);

const role = require('./controllers/roleController');
app.use('/role', role);

const session = require('./controllers/sessionController');
app.use('/session', role);

const newsSource = require('./controllers/newsSourceController');
app.use('/newsource', role);

// run the app
app.listen(port,
    ()=>console.log(`App listening on port: ${port}`)); 