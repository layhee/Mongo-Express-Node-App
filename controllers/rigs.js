const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('rigs/index.ejs')
})
router.get('/new', (req,res) => {
    res.render('rigs/new.ejs')
})

module.exports = router