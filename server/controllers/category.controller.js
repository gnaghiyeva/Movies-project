const categoryModel = require('../models/categories.model')

const categoryController = {
    getAll: async (req, res) => {
        const { categoryName } = req.query
        const allCategories = await categoryModel.find();
        if (categoryName === undefined) {
            res.status(200).send({
                data: allCategories,
                message: "categories get success!"
            })
        }
        else {
            res.status(200).send({
                data: allCategories.filter((x) => x.categoryName.toLowerCase().trim().includes(categoryName.toLowerCase().trim())),
                message: "categories get success!"
            })
        }
    },
    getbyID: async (req, res) => {
        const id = req.params.id
        categoryModel.findById(id).then((category) => {
            res.status(200).send({
                data: category,
                message: 'category get  success'
            })

        }).catch((err) => {
            res.send('category not found')
        })


    },
    post: async (req, res) => {
        const newCategory = new categoryModel({
            categoryName: req.body.categoryName
            
        })
        await newCategory.save()
        res.status(201).send("category created succesfully")
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const deletedCategory = await categoryModel.findByIdAndDelete(id)
        if (deletedCategory == undefined) {
            res.status(204).send("category not found")
        }
        else {
            res.status(200).send({
                data: deletedCategory,
                message: 'category deleted succesfully'
            })
        }
    },
    edit: async(req,res)=>{
        const id = req.params.id;
        const {categoryName} = req.body
        const existedCategory = await categoryModel.findByIdAndUpdate(id,{categoryName:categoryName})
        if(existedCategory==undefined){
          res.status(204).send('category not found')
        }
        else{
          res.status(200).send('category edited succesfuly')
        }
    }


}

module.exports = categoryController