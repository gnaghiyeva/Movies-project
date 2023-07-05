const express = require('express');
const upcomingSong_router = express.Router();
const UpcomingSongController = require('../controllers/upcomingSongs.controller');
const upload = require('../helper/songupload');


//post Video
upcomingSong_router.post('/', upload.single('song'), UpcomingSongController.post);


//get All Videos
upcomingSong_router.get('/',UpcomingSongController.getAll)

//get Video by ID
upcomingSong_router.get('/:id',UpcomingSongController.getByID)


upcomingSong_router.delete('/:id',UpcomingSongController.delete)

upcomingSong_router.put('/:id',upload.single('song'),UpcomingSongController.edit)


module.exports = upcomingSong_router