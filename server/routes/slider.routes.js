const express = require('express')
const slider_router = express.Router()
const sliderController = require('../controllers/slider.controller')
const upload = require('../helper/upload');

slider_router.get('/',sliderController.getAll)

//get Slider by ID
slider_router.get('/:id',sliderController.getByID)

//post Slider
slider_router.post('/',upload.single('imageURL'),sliderController.post)

//delete Slider
slider_router.delete('/:id',sliderController.delete)

//edit Slider
slider_router.put('/:id',sliderController.edit)

module.exports = slider_router