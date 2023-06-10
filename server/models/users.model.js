const mongoose = require('mongoose')

const UsersModel = mongoose.model("Users", new mongoose.Schema({
    username: String,
    email:String,
    password:String,
    isAdmin:Boolean,
   
}));

module.exports = UsersModel