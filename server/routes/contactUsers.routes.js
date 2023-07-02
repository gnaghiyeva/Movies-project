const express = require('express')
const contactUser_router = express.Router()
const gettingUsersController = require('../controllers/gettingUsers.controller')

//get All
contactUser_router.get('/', gettingUsersController.getAll)

contactUser_router.get('/:id',gettingUsersController.getByID)

//post 
contactUser_router.post('/',gettingUsersController.post)

//delete
contactUser_router.delete("/:id", gettingUsersController.delete)

//edit
contactUser_router.put("/:id", gettingUsersController.edit)

module.exports = contactUser_router