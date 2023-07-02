const ContactUsersModel = require('../models/contactUsers.model')

const gettingUsersController = {
    getAll: async (req, res) => {
        const { name } = req.query
        const allContactUsers = await ContactUsersModel.find();
        if (name === undefined) {
            res.status(200).send({
                data: allContactUsers,
                message: "users get success!"
            })
        }
        else {
            res.status(200).send({
                data: allContactUsers.filter((x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
                message: "users get success!"
            })
        }
    },

    getByID: async (req, res) => {
        const id = req.params.id;
        ContactUsersModel.findById(id).then((user) => {
            res.status(200).send({
                data: user,
                message: 'data get success'
            })
            console.log("model found: ", user);

        }).catch((err) => {
            res.send('data not found')
        })

    },

    edit: async(req,res)=>{
        const id = req.params.id;
        const name = req.body.name
        const surname = req.body.surname
        const email = req.body.email
        const opinions = req.body.opinions

        const existedContactUsers = await ContactUsersModel.findByIdAndUpdate(id,{name:name, surname:surname, email:email, opinions:opinions})
        if(existedContactUsers==undefined){
          res.status(204).send('users not found')
        }
        else{
          res.status(200).send('users edited succesfuly')
        }
    },
    post: async (req, res) => {
        const newContactUser = new ContactUsersModel({
            name: req.body.name,
            surname:req.body.surname,
            email:req.body.email,
            opinions:req.body.opinions
        });
        await newContactUser.save();
        res.status(201).send("created");
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const deletedContactUser = await ContactUsersModel.findByIdAndDelete(id)
        if (deletedContactUser == undefined) {
            res.status(204).send("user not found")
        }
        else {
            res.status(200).send({
                data: deletedContactUser,
                message: 'user deleted succesfully'
            })
        }
    },
}

module.exports = gettingUsersController