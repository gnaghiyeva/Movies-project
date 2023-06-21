const ContactModel = require('../models/contact.model')

const contactController = {
    getAll: async (req, res) => {
        const { address } = req.query
        const allContact = await ContactModel.find();
        if (address === undefined) {
            res.status(200).send({
                data: allContact,
                message: "contact get success!"
            })
        }
        else {
            res.status(200).send({
                data: allContact.filter((x) => x.address.toLowerCase().trim().includes(address.toLowerCase().trim())),
                message: "contact get success!"
            })
        }
    },

    getByID: async (req, res) => {
        const id = req.params.id;
        ContactModel.findById(id).then((model) => {
            res.status(200).send({
                data: model,
                message: 'data get success'
            })
            console.log("model found: ", model);

        }).catch((err) => {
            res.send('data not found')
        })

    },

    edit: async(req,res)=>{
        const id = req.params.id;
        const desc = req.params.desc
        const address = req.body.address
        const phone = req.body.phone
        const email = req.body.email
        const location = req.body.location
    
        const existedContact = await ContactModel.findByIdAndUpdate(id,{desc:desc,address:address, phone:phone, email:email, location:location})
        if(existedContact==undefined){
          res.status(204).send('contact not found')
        }
        else{
          res.status(200).send('contact edited succesfuly')
        }
    },
    post: async (req, res) => {
        const newContact = new ContactModel({
            desc:req.body.desc,
            address: req.body.address,
            phone:req.body.phone,
            email:req.body.email,
            location:req.body.location,
        });
        await newContact.save();
        res.status(201).send("created");
    },

}

module.exports = contactController