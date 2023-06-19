const UpcomingVideoModel = require('../models/upcomingVideo.model')

const fs = require('fs')
const path = require('path')
const videosDIR = path.join(__dirname, "..")

const UpcomingVideosController = {

    post: async (req, res) => {
        const url = req.protocol + '://' + req.get('host');
        const newUpcomingVideo = new UpcomingVideoModel({
            desc: req.body.desc,
            filmID: req.body.filmID,
            video: url + '/videos/' + req.file.filename,

        });
        await newUpcomingVideo.save();
        res.status(201).send("created");
    },


    getAll: async (req, res) => {
        const UpcomingVideos = await UpcomingVideoModel.find();
        res.status(200).send({
            data: UpcomingVideos,
            message: 'data get success'
        })
    },

  
    getByID: async (req, res) => {
        const id = req.params.id;
        const UpcomingVideos = await UpcomingVideoModel.find();
        if(UpcomingVideos==undefined){
            res.status(404).send("videos not found!");
          }
          else{
            res.status(200).send(UpcomingVideos.filter((video)=>video.filmID==id))
          }
    },



    //from me
    delete: async (req, res) => {
        const id = req.params.id;
        const desc = req.body.desc;
        const deletedUpcomingVideo = await UpcomingVideoModel.findByIdAndDelete(id);
        const idx = deletedUpcomingVideo.video.indexOf("videos/")
        const videoName = deletedUpcomingVideo.video.substr(idx)

        fs.unlinkSync('./' + videoName)
        if (deletedUpcomingVideo === undefined) {
            res.status(404).send("UpcomingVideo not found");
        } else {
            res.status(203).send({
                data: deletedUpcomingVideo,
                message: "UpcomingVideo deleted successfully",
            });
        }

    },



       edit: async (req, res) => {
        const id = req.params.id;
        const desc = req.body.desc;
       
        let updatedUpcomingVideo = await UpcomingVideoModel.findById(id);
        if (!updatedUpcomingVideo) {
          return res.status(404).send("UpcomingVideo not found");
        }
      
       
        const idx = updatedUpcomingVideo.video.indexOf("videos/");
        const videoName = updatedUpcomingVideo.video.substr(idx);
      
        if (req.file) {
          fs.unlinkSync('./' + videoName);
          const updatedUrl = req.protocol + '://' + req.get('host');
          updatedUpcomingVideo.video = updatedUrl + '/videos/' + req.file.filename;
        }
      
        // Dəyişdirilmiş məlumatları güncəlləyirik
        updatedUpcomingVideo.desc = desc;  
        await updatedUpcomingVideo.save();
        res.status(203).send({
          data: updatedUpcomingVideo,
          message: "UpcomingVideo updated successfully",
        });
      }
      

}

module.exports = UpcomingVideosController