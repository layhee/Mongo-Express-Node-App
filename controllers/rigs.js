const express = require('express')
const router = express.Router()
const multer = require('multer')
const Rig = require('../models/rigs.js')

// file upload middleware
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/img')
    },  
    filename: (req, file, cb) => {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })

const upload = multer({storage: fileStorageEngine})

// INDEX
router.get('/', (req,res) => {
    Rig.find({}, (error, foundRig) => {
        res.render('rigs/index.ejs', {
            rigs: foundRig,
            isAthenticated: req.oidc.isAuthenticated(),
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

router.post ('/rigs', upload.single('image'), (req,res) => {
    console.log(req.file)
    console.log('Single file upload success')
  })
  
router.post('/rigs/uploads', upload.array('images', 5), (req,res) => {
    console.log(req.files)
    console.log('multiple is cool')
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

module.exports = router