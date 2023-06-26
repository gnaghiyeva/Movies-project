const mongoose = require('mongoose')

const StreamingModel = mongoose.model("Streaming", new mongoose.Schema({
    title:String,
    desc:String,
    link:String
   
}));

module.exports = StreamingModel