const mongoose = require('mongoose')

const FilmModel = mongoose.model("Films", new mongoose.Schema({
    title:String,
    image:String,
    releaseDate: {
      type: String,
      default: function () {
          const date = new Date();
          date.setHours(0, 0, 0, 0);
          return date.toISOString().split('T')[0]; // Yalnız "yyyy-mm-dd" hissəsini qaytarır
      }
  },
    minute:Number,
    imdb:Number,
    quality:String,
    category:String,
    categoryID:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
    
}));

module.exports = FilmModel

// const title = req.body.title;
// const releaseDate = req.body.releaseDate;
// const minute = req.body.minute;
// const imdb = req.body.imdb