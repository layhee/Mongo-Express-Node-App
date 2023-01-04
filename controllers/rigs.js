const express = require('express')
const router = express.Router()
const Rig = require('../models/rigs.js')

// INDEX
router.get('/', (req,res) => {
    Rig.find({}, (error, foundRig) => {
        res.render('rigs/index.ejs', {
            rigs: foundRig,
            // isAthenticated: req.oidc.isAuthenticated(),
        })
    })
})

// NEW
router.get('/new', (req,res) => {
    res.render('rigs/new.ejs')
})

// DELETE
router.delete('/:id', (req,res) => {
    Rig.findByIdAndRemove(req.params.id, () => {
        res.redirect('/rigs')
    })
})

// UPDATE
router.put('/:id', (req,res) => {
    Rig.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedRig) => {
        res.redirect('/rigs/')
    })
})

// CREATE 
router.post('/', (req,res) => {
    Rig.create(req.body, (error, createdRig) => {
        res.redirect('/rigs')
    })
})

// EDIT
router.get('/:id/edit', (req,res) => {
    Rig.findById(req.params.id, (error, foundRig) => {
        res.render('rigs/edit.ejs', {
            rig: foundRig
        })
    })
})

// SHOW
router.get('/:id', (req,res) => {
    Rig.findById(req.params.id, (error, foundRig) => {
        res.render('rigs/show.ejs', {
            rig: foundRig
        })
    })
})

// saveImg(rig, req.body.img)

// function saveImg(rig, imgEncoded) {
//     const image = JSON.parse(imgEncoded)
//     rig.img = new Buffer.from(img.data, 'base64') 
// }

module.exports = router