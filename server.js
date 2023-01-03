//Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session')
require('dotenv').config()
const bcrypt = require('bcrypt')
const app = express();
const db = mongoose.connection;
const rigData = require('./rig-data')
const rideData = require('./ride-data')
const ridesController = require('./controllers/rides.js')
const rigsController = require('./controllers/rigs.js')
const Rig = require('./models/rigs.js')
const Ride = require('./models/rides.js')

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
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use('/rides', ridesController)
app.use('/rigs', rigsController)


// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project


// Routes
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

app.get('/' , (req, res) => {
  res.render('index.ejs');
});

// // Authorization
// app.get('/hashed', (req,res) => {
//   const hashedString = bcrypt.hashSync('example', bcrypt.genSaltSync(10))
//   const isSameString = bcrypt.compareSync('yourGuessHere', hashedString)
//   res.send(isSameString)
// })

// app.get('/any', (req,res) => {
//   req.session.anyProperty = 'anything you want it to be'
//   res.send('sup')
// })

// app.get('/update', (req,res) => {
//   req.session.anyProperty = 'something'
//   res.send('dis da route for updating something')
// })

// app.get('/retrieve', (req,res) => {
//   if (req.session.anyProperty === 'anything you want it to be') {
//     res.send('coolio')
//   } else {
//     res.send('nope')
//   }
// })
// app.get('/destroy', (req,res) => {
//   req.session.destroy((error) => {
//     if (error) {
//       res.send(error)
//     } else {
//       res.send({
//         success: true
//       })
//     }
//   })
// })

// Login + Register Routes
app.get('/login', (req,res) => {
  res.render('login.ejs')
})

app.get('/register', (req,res) => {
  res.render('register.ejs')
})

app.post('/register', (req,res) => {

})

//Listener
app.listen(PORT, () => console.log('express is listening on:', PORT));