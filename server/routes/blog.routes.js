const express = require('express');
const blog_router = express.Router()
const blogController = require('../controllers/blog.controller');
const upload = require('../helper/upload');
//get All Artists
blog_router.get('/',blogController.getAll)

//get Artist by ID
blog_router.get('/:id',blogController.getByID)

//post Artist
blog_router.post('/',upload.single('image'),blogController.post)

//delete Artist
blog_router.delete('/:id',blogController.delete)

//edit Artist
blog_router.put('/:id',upload.single('image'),blogController.edit)


module.exports = blog_router