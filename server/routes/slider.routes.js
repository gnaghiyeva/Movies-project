const express = require('express');
const slider_router = express.Router()
const sliderController = require('../controllers/slider.controller');
const upload = require('../helper/upload');
//get All Artists
slider_router.get('/',sliderController.getAll)

//get Artist by ID
slider_router.get('/:id',sliderController.getByID)

//post Artist
slider_router.post('/',upload.single('image'),sliderController.post)

//delete Artist
slider_router.delete('/:id',sliderController.delete)

//edit Artist
slider_router.put('/:id',upload.single('image'),sliderController.edit)


module.exports = slider_router