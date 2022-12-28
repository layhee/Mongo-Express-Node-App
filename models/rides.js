const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rideSchema = new Schema({
    name: String,
    start: String,
    end: String,
    distance: Number,
    terrain: String,
    img: String,
    }, {
        timestamps: true
})

module.exports = mongoose.model('Ride', rideSchema)