const fs = require('fs')
const path = require('path')
const BlogModel = require('../models/blog.model')
const imagesDIR = path.join(__dirname, "..")

const BlogController = {

    post: async (req, res) => {
        const url = req.protocol + '://' + req.get('host');
        const newBlog = new BlogModel({
            title: req.body.title,
            description: req.body.description,
            image: url + '/images/' + req.file.filename,
            author: req.body.author,
            blockquote: req.body.blockquote,
            releaseDate: req.body.releaseDate

        });
        await newBlog.save();
        res.status(201).send("created");
    },


    // getAll: async (req, res) => {
    //     const Blogs = await BlogModel.find();
    //     res.status(200).send({
    //         data: Blogs,
    //         message: 'data get success'
    //     })
    // },
    getAll: async (req, res) => {
        const { title } = req.query
        const Blogs = await BlogModel.find();
        if (!title) {
            res.status(200).send({
                data: Blogs,
                message: 'card get successfully'
            })
        }
        else {
            res.status(200).send({
                data: Blogs.filter((x) => x.title.toLowerCase().trim().includes(title.toLowerCase().trim())),
                message: 'card get succesfully'
            })
        }
    },
    getByID: async (req, res) => {
        const id = req.params.id;
        BlogModel.findById(id).then((blog) => {
            res.status(200).send({
                data: blog,
                message: 'data get success'
            })
            console.log("blog found: ", blog);

        }).catch((err) => {
            res.send('data not found')
        })

    },




    //from me
    delete: async (req, res) => {
        const id = req.params.id;
        const deletedBlog = await BlogModel.findByIdAndDelete(id);
        const idx = deletedBlog.image.indexOf("images/")
        const imageName = deletedBlog.image.substr(idx)

        fs.unlinkSync('./' + imageName)
        if (deletedBlog === undefined) {
            res.status(404).send("Blog not found");
        } else {
            res.status(203).send({
                data: deletedBlog,
                message: "Blog deleted successfully",
            });
        }

    },


    edit: async (req, res) => {
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const blockquote = req.body.blockquote;
        const author = req.body.author;
        const releaseDate = req.body.releaseDate;

        let updatedBlog = await BlogModel.findById(id);

        if (!updatedBlog) {
            return res.status(404).send("Blog not found");
        }

        const idx = updatedBlog.image.indexOf("images/");
        const imageName = updatedBlog.image.substr(idx);

        if (req.file) {
            fs.unlinkSync(path.join(imagesDIR, imageName));

            const updatedUrl = req.protocol + '://' + req.get('host');
            updatedBlog.image = updatedUrl + '/images/' + req.file.filename;
        }

        updatedBlog.title = title;
        updatedBlog.description = description;
        updatedBlog.blockquote = blockquote;
        updatedBlog.author = author;
        updatedBlog.releaseDate = releaseDate;

        await updatedBlog.save();

        res.status(203).send({
            data: updatedBlog,
            message: "Blog updated successfully",
        });
    }



}

module.exports = BlogController