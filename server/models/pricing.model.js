const mongoose = require('mongoose')

const PricingModel = mongoose.model("Pricings", new mongoose.Schema({
    className:String,
    price:Number,
    videoQuality:String,
    resolution:String,
    screen:Number

}))

module.exports = PricingModel
