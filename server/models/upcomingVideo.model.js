const mongoose = require('mongoose')

const UpcomingVideoModel = mongoose.model("UpcomingVideos", new mongoose.Schema({
    
    desc:String,
    video:String,
    filmID:{type:mongoose.Schema.Types.ObjectId,ref:'Films'},
    
}));

module.exports = UpcomingVideoModel