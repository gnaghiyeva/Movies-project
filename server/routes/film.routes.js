const express = require('express');
const film_router = express.Router()
const filmController = require('../controllers/film.controller');
const upload = require('../helper/upload');
//get All Films
film_router.get('/',filmController.getAll)

//get Film by ID
film_router.get('/:id',filmController.getByID)

//post Film
film_router.post('/',upload.single('image'),filmController.post)

//delete Film
film_router.delete('/:id',filmController.delete)

//edit Film
film_router.put('/:id',upload.single('image'),filmController.edit)


module.exports = film_router