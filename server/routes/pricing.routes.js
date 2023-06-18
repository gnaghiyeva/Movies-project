const express = require('express')
const pricing_router = express.Router()
const pricingController = require('../controllers/pricing.controller')

//get All
pricing_router.get('/', pricingController.getAll)

pricing_router.get('/:id',pricingController.getByID)

//post Artist
pricing_router.post('/',pricingController.post)


//edit
pricing_router.put("/:id", pricingController.edit)

module.exports = pricing_router