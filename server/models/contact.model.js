const mongoose = require('mongoose')

const ContactModel = mongoose.model("Contact", new mongoose.Schema({
    desc:String,
    address:String,
    phone:String,
    email:String,
    location:String,
}))

module.exports = ContactModel
