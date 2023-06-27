const express = require('express')
const streaming_router = express.Router()
const streamingController = require('../controllers/streaming.controller')

//get All
streaming_router.get('/', streamingController.getAll)

streaming_router.get('/:id',streamingController.getByID)

//post Streaming
streaming_router.post('/',streamingController.post)


//edit
streaming_router.put("/:id", streamingController.edit)

module.exports = streaming_router