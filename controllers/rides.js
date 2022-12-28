const express = require('express')
const router = express.Router()
const Ride = require('../models/rides.js')

// INDEX
router.get('/', (req,res) => {
    Ride.find({}, (err, foundRide) => {
        res.render('rides/index.ejs', {
            rides: foundRide
        })
    })
})
// NEW
router.get('/new', (req,res) => {
    res.render('rides/new.ejs')
})

// DELETE
router.delete('/:id', (req,res) => {
    Ride.findByIdAndRemove(req.params.id, () => {
        res.redirect('/rides')
    })
})

// UPDATE
router.put('/:id', (req,res) => {
    Ride.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedRide) => {
        res.redirect('/rides/')
    })
})

// CREATE 
router.post('/', (req,res) => {
    Ride.create(req.body, (error, createdRide) => {
        res.redirect('/rides')
    })
})

// EDIT
router.get('/:id/edit', (req,res) => {
    Ride.findById(req.params.id, (error, foundRide) => {
        res.render('rides/edit.ejs', {
            rides: foundRide
        })
    })
})

// SHOW
router.get('/:id', (req,res) => {
    Ride.findById(req.params.id, (error, foundRide) => {
        res.render('rides/show.ejs', {
            rides: foundRide
        })
    })
})

module.exports = router