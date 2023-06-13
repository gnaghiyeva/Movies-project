const express = require('express')
const category_router = express.Router()
const categoryController = require('../controllers/category.controller')

//get All
category_router.get('/', categoryController.getAll)

//get By id
category_router.get('/:id', categoryController.getbyID)

//delete
category_router.delete("/:id", categoryController.delete)
//post
category_router.post("/", categoryController.post)

//edit
category_router.put("/:id", categoryController.edit)

module.exports = category_router