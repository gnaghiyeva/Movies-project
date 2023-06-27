const express = require('express')
const contact_router = express.Router()
const contactController = require('../controllers/contact.controller')

//get All
contact_router.get('/', contactController.getAll)

contact_router.get('/:id',contactController.getByID)

//post contact
contact_router.post('/',contactController.post)


//edit
contact_router.put("/:id", contactController.edit)

module.exports = contact_router