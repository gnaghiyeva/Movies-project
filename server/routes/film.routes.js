const express = require('express');
const film_router = express.Router()
const filmController = require('../controllers/film.controller');
const upload = require('../helper/upload');
//get All Artists
film_router.get('/',filmController.getAll)

//get Artist by ID
film_router.get('/:id',filmController.getByID)

//post Artist
film_router.post('/',upload.single('image'),filmController.post)

//delete Artist
film_router.delete('/:id',filmController.delete)

//edit Artist
film_router.put('/:id',upload.single('image'),filmController.edit)


module.exports = film_router