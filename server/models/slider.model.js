const mongoose = require('mongoose')

const SliderModel = mongoose.model("Slider", new mongoose.Schema({
    name:String,
    image: String,
}));

module.exports = SliderModel