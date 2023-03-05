const expres = require('express');
const cors = require('cors');
const app = expres();
const bodyParser = require('body-parser');
require('dotenv/config');
const mongoose = require('mongoose');
mongoose.set('strictQuery',false); // to stop showing the warning in the console
mongoose.connect(process.env.DB_CONNECTION,
    console.log('Connected to the database'));

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
const user = require('./controllers/userControler');
app.use('/user',user);

const role = require('./controllers/roleControler');
app.use('/role', role);

// run the app
app.listen(process.env.PORT,
    ()=>console.log(`App listening on port: ${process.env.PORT}`));