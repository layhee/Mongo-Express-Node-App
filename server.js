//Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const db = mongoose.connection;
const rigData = require('./rig-data')
const rideData = require('./ride-data')
const ridesController = require('./controllers/rides.js')
const rigsController = require('./controllers/rigs.js')
const Rig = require('./models/rigs.js')
const Ride = require('./models/rides.js')
mongoose.set('strictQuery', true)

//Port
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//Database
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
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
app.use('/rides', ridesController)
app.use('/rigs', rigsController)
// Routes

app.get('/' , (req, res) => {
  res.render('index.ejs');
});


app.get('/rigs/seed', (req,res) => {
  Rig.create(rigData, (err) => {
    res.redirect('/rigs')
  })
})

app.get('/rides/seed', (req,res) => {
  Ride.create(rideData, (err) => {
    res.redirect('/rides')
  })
})

//Listener
app.listen(PORT, () => console.log('express is listening on:', PORT));