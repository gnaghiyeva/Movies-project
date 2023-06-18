const mongoose = require('mongoose')

const pricingSliderModel = mongoose.model("pricingSlider", new mongoose.Schema({
    name:String,
    image: String,
}));

module.exports = pricingSliderModel