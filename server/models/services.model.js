const mongoose = require('mongoose')

const ServiceModel = mongoose.model("Services", new mongoose.Schema({
    title:String,
    desc:String,
    image:String,
}));

module.exports = ServiceModel