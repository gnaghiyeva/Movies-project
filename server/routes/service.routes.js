const express = require('express');
const service_router = express.Router()
const serviceController = require('../controllers/service.controller');
const upload = require('../helper/upload');
//get All Service
service_router.get('/',serviceController.getAll)

//get Service by ID
service_router.get('/:id',serviceController.getByID)

//post Service
service_router.post('/',upload.single('image'),serviceController.post)

//delete Service
service_router.delete('/:id',serviceController.delete)

//edit Service
service_router.put('/:id',upload.single('image'),serviceController.edit)


module.exports = service_router