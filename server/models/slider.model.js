const mongoose = require('mongoose')

const SliderModel = mongoose.model("Slider", new mongoose.Schema({
    image: String,
}));

module.exports = SliderModel