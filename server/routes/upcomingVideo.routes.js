const express = require('express');
const upcomingVideo_router = express.Router()
const UpcomingVideoController = require('../controllers/upcomingVideos.controller');
const upload = require('../helper/upload');
//get All Artists
upcomingVideo_router.get('/',UpcomingVideoController.getAll)

//get Artist by ID
upcomingVideo_router.get('/:id',UpcomingVideoController.getByID)

//post Artist
upcomingVideo_router.post('/',upload.single('video'),UpcomingVideoController.post)

//delete Artist
upcomingVideo_router.delete('/:id',UpcomingVideoController.delete)

//edit Artist
upcomingVideo_router.put('/:id',upload.single('video'),UpcomingVideoController.edit)


module.exports = upcomingVideo_router