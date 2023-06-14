const express = require('express');
const service_router = express.Router()
const serviceController = require('../controllers/service.controller');
const upload = require('../helper/upload');
//get All Artists
service_router.get('/',serviceController.getAll)

//get Artist by ID
service_router.get('/:id',serviceController.getByID)

//post Artist
service_router.post('/',upload.single('image'),serviceController.post)

//delete Artist
service_router.delete('/:id',serviceController.delete)

//edit Artist
service_router.put('/:id',upload.single('image'),serviceController.edit)


module.exports = service_router