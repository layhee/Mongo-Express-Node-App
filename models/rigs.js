const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rigSchema = new Schema({
    name: String,
    frame: String,
    wheels: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Rig', rigSchema)

// module.exports = Rig