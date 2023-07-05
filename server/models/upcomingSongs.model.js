const mongoose = require('mongoose')

const UpcomingSongModel = mongoose.model("UpcomingSongs", new mongoose.Schema({
    name:String,
    song:String,
    filmID:{type:mongoose.Schema.Types.ObjectId,ref:'Films'},
}));

module.exports = UpcomingSongModel