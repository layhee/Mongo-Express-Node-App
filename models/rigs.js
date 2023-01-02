const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rigSchema = new Schema({
    name: String,
    frame: String,
    fork: String,
    rims: String,
    hubs: String,
    tires: String,
    handlebars: String,
    headset: String,
    crankset: String,
    pedals: String,
    cassette: String,
    derailleur: String,
    brakes: String,
    shifters: String,
    saddle: String,
    seatpost: String,
    stem: String,
    frontbag: String,
    framebag: String,
    rearbag: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Rig', rigSchema)
