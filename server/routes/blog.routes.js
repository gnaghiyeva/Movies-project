const express = require('express');
const blog_router = express.Router()
const blogController = require('../controllers/blog.controller');
const upload = require('../helper/upload');
//get All Blogs
blog_router.get('/',blogController.getAll)

//get Blog by ID
blog_router.get('/:id',blogController.getByID)

//post Blog
blog_router.post('/',upload.single('image'),blogController.post)

//delete Blog
blog_router.delete('/:id',blogController.delete)

//edit Blog
blog_router.put('/:id',upload.single('image'),blogController.edit)


module.exports = blog_router