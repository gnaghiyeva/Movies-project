const UpcomingSongModel = require('../models/upcomingSongs.model')

const fs = require('fs')
const path = require('path')
const songsDIR = path.join(__dirname, "..")

const UpcomingSongsController =  {
    post: async (req, res) => {
        const url = req.protocol + '://' + req.get('host');
        const newUpcomingSong = new UpcomingSongModel({
            name: req.body.name,
            filmID: req.body.filmID,
            song: url + '/songs/' + req.file.filename,

        });
        await newUpcomingSong.save();
        res.status(201).send("created");
    },

    getAll: async (req, res) => {
        const UpcomingSongs = await UpcomingSongModel.find();
        res.status(200).send({
            data: UpcomingSongs,
            message: 'data get success'
        })
    },

    getByID: async (req, res) => {
        const id = req.params.id;
        const UpcomingSong = await UpcomingSongModel.find();
        if(UpcomingSong==undefined){
            res.status(404).send("songs not found!");
          }
          else{
            res.status(200).send(UpcomingSong.filter((song)=>song.filmID==id))
          }
    },

     //from me
     delete: async (req, res) => {
        const id = req.params.id;
        const name = req.body.name;
        const deletedUpcomingSong = await UpcomingSongModel.findByIdAndDelete(id);
        const idx = deletedUpcomingSong.song.indexOf("songs/")
        const songName = deletedUpcomingSong.song.substr(idx)

        fs.unlinkSync('./' + songName)
        if (deletedUpcomingSong === undefined) {
            res.status(404).send("UpcomingSong not found");
        } else {
            res.status(203).send({
                data: deletedUpcomingSong,
                message: "UpcomingSong deleted successfully",
            });
        }

    },


    
    edit: async (req, res) => {
        const id = req.params.id;
        const name = req.body.name;
       
        let updatedUpcomingSong = await UpcomingSongModel.findById(id);
        if (!updatedUpcomingSong) {
          return res.status(404).send("UpcomingSong not found");
        }
      
       
        const idx = updatedUpcomingSong.song.indexOf("songs/");
        const songName = updatedUpcomingSong.song.substr(idx);
      
        if (req.file) {
          fs.unlinkSync('./' + songName);
          const updatedUrl = req.protocol + '://' + req.get('host');
          updatedUpcomingSong.song = updatedUrl + '/songs/' + req.file.filename;
        }
      
        
        updatedUpcomingSong.name = name;  
        await updatedUpcomingSong.save();
        res.status(203).send({
          data: updatedUpcomingSong,
          message: "UpcomingSong updated successfully",
        });
      }
      




}

module.exports = UpcomingSongsController