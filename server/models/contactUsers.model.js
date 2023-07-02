const mongoose = require('mongoose')

const ContactUsersModel = mongoose.model("ContactUsers", new mongoose.Schema({
    name:String,
    surname:String,
    email:String,
    opinions:String
   
}));

module.exports = ContactUsersModel