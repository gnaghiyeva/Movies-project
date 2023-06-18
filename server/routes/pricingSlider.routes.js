const express = require('express');
const pricingSlider_router = express.Router()
const pricingSliderController = require('../controllers/pricingSlider.controller');
const upload = require('../helper/upload');
//get All Artists
pricingSlider_router.get('/',pricingSliderController.getAll)

//get Artist by ID
pricingSlider_router.get('/:id',pricingSliderController.getByID)

//post Artist
pricingSlider_router.post('/',upload.single('image'),pricingSliderController.post)

//delete Artist
pricingSlider_router.delete('/:id',pricingSliderController.delete)

//edit Artist
pricingSlider_router.put('/:id',upload.single('image'),pricingSliderController.edit)


module.exports = pricingSlider_router