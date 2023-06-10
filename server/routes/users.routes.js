const express = require('express')
const user_router = express.Router()

const usersController = require('../controllers/users.controller')

user_router.get('/users',usersController.getAllUsers)

//get All Songs
user_router.post('/register', usersController.postRegister)

//post Song
user_router.post('/login', usersController.postLogin)

user_router.post('/admin/login', usersController.AdminPostLogin)

module.exports = user_router