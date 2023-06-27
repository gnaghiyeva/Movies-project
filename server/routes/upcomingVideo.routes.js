const express = require('express');
const upcomingVideo_router = express.Router()
const UpcomingVideoController = require('../controllers/upcomingVideos.controller');
const upload = require('../helper/videoupload');
//get All Videos
upcomingVideo_router.get('/',UpcomingVideoController.getAll)

//get Video by ID
upcomingVideo_router.get('/:id',UpcomingVideoController.getByID)

//post Video
upcomingVideo_router.post('/',upload.single('video'),UpcomingVideoController.post)

//delete Video
upcomingVideo_router.delete('/:id',UpcomingVideoController.delete)

//edit Video
upcomingVideo_router.put('/:id',upload.single('video'),UpcomingVideoController.edit)


module.exports = upcomingVideo_router