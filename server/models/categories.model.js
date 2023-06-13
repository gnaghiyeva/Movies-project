const mongoose = require('mongoose')

const CategoryModel = mongoose.model("Category", new mongoose.Schema({
    categoryName:String,
    
}));

module.exports = CategoryModel