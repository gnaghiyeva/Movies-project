const FilmModel = require('../models/film.model')

const fs = require('fs')
const path = require('path')
const imagesDIR = path.join(__dirname, "..")

const FilmController = {

    post: async (req, res) => {
        const url = req.protocol + '://' + req.get('host');
        const newFilm = new FilmModel({
            title: req.body.title,
            image: url + '/images/' + req.file.filename,
            releaseDate: req.body.releaseDate,
            minute: req.body.minute,
            imdb: req.body.imdb,
            quality:req.body.quality,
            category:req.body.category

        });
        await newFilm.save();
        res.status(201).send("created");
    },


    getAll: async (req, res) => {
        const Films = await FilmModel.find();
        res.status(200).send({
            data: Films,
            message: 'data get success'
        })
    },

    getByID: async (req, res) => {
        const id = req.params.id;
        FilmModel.findById(id).then((film) => {
            res.status(200).send({
                data: film,
                message: 'data get success'
            })
            console.log("Film found: ", film);

        }).catch((err) => {
            res.send('data not found')
        })

    },


    // delete: async (req, res) => {
    //   const id = req.params.id;
    //   // console.log(id)
    //   try {
    //     const deletedFilm = await FilmModel.findOne({_id:id})
    //     console.log(deletedFilm)
    //     // const idx = deletedFilm.image.indexOf("images/")

    //     // await FilmModel.deleteMany({ FilmID: id });
    //     // sen her kodda eyni sehvi etmisen evvelce emeliyyati gorursen sonra Filmin varligini yoxlayirsan

    //     const imageName = deletedFilm.image
    //     console.log(imagesDIR)
    //     fs.unlinkSync(`${imagesDIR}/images/${imageName}`)
    //     await FilmModel.findByIdAndDelete(id);
    //     res.status(203).send({
    //       data: deletedFilm,
    //       message: "Film deleted successfully",
    //     });
    //   }
    //   catch {
    //     res.status(404).send("Film not found");
    //   }
    // },

    //from me
    delete: async (req, res) => {
        const id = req.params.id;
        const deletedFilm = await FilmModel.findByIdAndDelete(id);
        const idx = deletedFilm.image.indexOf("images/")
        const imageName = deletedFilm.image.substr(idx)

        fs.unlinkSync('./' + imageName)
        if (deletedFilm === undefined) {
            res.status(404).send("Film not found");
        } else {
            res.status(203).send({
                data: deletedFilm,
                message: "Film deleted successfully",
            });
        }

    },



    // edit: async (req, res) => {
    //     const id = req.params.id;
    //     const title = req.body.title;
    //     const releaseDate = req.body.releaseDate;
    //     const minute = req.body.minute;
    //     const imdb = req.body.imdb
    //     const quality = req.body.quality
    //     const category = req.body.category

    //     const existedFilm = await FilmModel.findByIdAndDelete(id, { title: title, releaseDate: releaseDate, minute: minute, imdb: imdb, quality:quality, category:category });
    //     const idx = existedFilm.image.indexOf("images/")
    //     const imageName = existedFilm.image.substr(idx)

    //     fs.unlinkSync('./' + imageName)
    //     if (existedFilm === undefined) {
    //         res.status(404).send("film not found");
    //     } else {
    //         res.status(203).send({
    //             data: existedFilm,
    //             message: "film updated successfully",
    //         });
    //     }


    //     const updatedUrl = req.protocol + '://' + req.get('host');
    //     const updatedFilm = new FilmModel({

    //         title: req.body.title,
    //         releaseDate: req.body.releaseDate,
    //         minute: req.body.minute,
    //         imdb: req.body.imdb,
    //         quality:req.body.quality,
    //         category:req.body.category,
    //         image: updatedUrl + '/images/' + req.file.filename,
    //     });

    //     await updatedFilm.save();

    // },

       edit: async (req, res) => {
        const id = req.params.id;
        const title = req.body.title;
        const releaseDate = req.body.releaseDate;
        const minute = req.body.minute;
        const imdb = req.body.imdb;
        const quality = req.body.quality;
        const category = req.body.category;
      
        let updatedFilm = await FilmModel.findById(id);
      
        if (!updatedFilm) {
          return res.status(404).send("Film not found");
        }
      
       
        const idx = updatedFilm.image.indexOf("images/");
        const imageName = updatedFilm.image.substr(idx);
      
        if (req.file) {
         
          fs.unlinkSync('./' + imageName);
      
          const updatedUrl = req.protocol + '://' + req.get('host');
          updatedFilm.image = updatedUrl + '/images/' + req.file.filename;
        }
      
        // Dəyişdirilmiş məlumatları güncəlləyirik
        updatedFilm.title = title;
        updatedFilm.releaseDate = releaseDate;
        updatedFilm.minute = minute;
        updatedFilm.imdb = imdb;
        updatedFilm.quality = quality;
        updatedFilm.category = category;
      
        await updatedFilm.save();
      
        res.status(203).send({
          data: updatedFilm,
          message: "Film updated successfully",
        });
      }
      

}

module.exports = FilmController