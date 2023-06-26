const mongoose = require('mongoose')

const BlogModel = mongoose.model("Blogs", new mongoose.Schema({
    image:String,
    title:String,
    releaseDate: {
      type: String,
      default: function () {
          const date = new Date();
          date.setHours(0, 0, 0, 0);
          return date.toISOString().split('T')[0];
      }
  },
    blockquote:String,
    author:String,  
    description:String  
}));

module.exports = BlogModel
