const mongoose = require('mongoose')

const SliderModel = mongoose.model("Slider", new mongoose.Schema({
    imageURL: String,
}));

module.exports = SliderModel