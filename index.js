const expres = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// setting up express app and database connection
const app = expres();
const port = process.env.PORT || 4000;
const db = process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27017/mynewscover';

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // to stop showing the warning in the console
mongoose.connect(db, console.log('Connected to the database'));

// middleware
app.use(cors());
app.use(bodyParser.json());

// session
const { router: session } = require('./controllers/sessionController');
app.use('/session', session);

// POST Passwordless Auth
const { post_passwordless: post_passwordless } = require('./controllers/sessionController');
app.post('/passwordless/:passwordless', post_passwordless);

// Get Passwordless Auth
const { get_passwordless: get_passwordless } = require('./controllers/sessionController');
app.get('/passwordless', get_passwordless);

// POST user
const { addUser } = require('./controllers/userController')
app.post('/user', addUser);

// Token verification
const { tokenVerification } = require('./controllers/sessionController');
app.use(tokenVerification);

// routes
const { router: user } = require('./controllers/userController')
app.use('/user', user);

const role = require('./controllers/roleController');
app.use('/role', role);

const newsSource = require('./controllers/newsSourceController');
app.use('/newsource', newsSource);

const category = require('./controllers/categoryController');
app.use('/categories', category);

const news = require('./controllers/newsController');
app.use('/news', news);

// run the app
app.listen(port, () => console.log(`App listening on port: ${port}`)); 
