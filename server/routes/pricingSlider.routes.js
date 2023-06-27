const express = require('express');
const pricingSlider_router = express.Router()
const pricingSliderController = require('../controllers/pricingSlider.controller');
const upload = require('../helper/upload');
//get All PricingSlider
pricingSlider_router.get('/',pricingSliderController.getAll)

//get PricingSlider by ID
pricingSlider_router.get('/:id',pricingSliderController.getByID)

//post PricingSlider
pricingSlider_router.post('/',upload.single('image'),pricingSliderController.post)

//delete PricingSlider
pricingSlider_router.delete('/:id',pricingSliderController.delete)

//edit PricingSlider
pricingSlider_router.put('/:id',upload.single('image'),pricingSliderController.edit)


module.exports = pricingSlider_router