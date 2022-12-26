require('dotenv').config()

//Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const rigData = require('./rig-data')

//Port
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//Database
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

//Middleware
app.use(methodOverride('_method'));
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project


// Routes
app.get('/rigs/seed', (req,res) => {
  Rig.create(rigData, (err) => {
    res.redirect('/rigs')
  })
})

const rigsController = require('./controllers/rigs.js');
const Rig = require('./models/rigs.js');
app.use('/rigs', rigsController)

app.get('/' , (req, res) => {
  res.render('index.ejs');
});

//Listener
app.listen(PORT, () => console.log('express is listening on:', PORT));

