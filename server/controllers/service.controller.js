const fs = require('fs')
const path = require('path')
const ServiceModel = require('../models/services.model')
const imagesDIR = path.join(__dirname, "..")

const ServiceController = {

    post: async (req, res) => {
        const url = req.protocol + '://' + req.get('host');
        const newService= new ServiceModel({
            title: req.body.title,
            desc:req.body.desc,
            image: url + '/images/' + req.file.filename,
            
        });
        await newService.save();
        res.status(201).send("created");
    },


    getAll: async (req, res) => {
        const Services = await ServiceModel.find();
        res.status(200).send({
            data: Services,
            message: 'data get success'
        })
    },

    getByID: async (req, res) => {
        const id = req.params.id;
        ServiceModel.findById(id).then((service) => {
            res.status(200).send({
                data: service,
                message: 'data get success'
            })
            console.log("service found: ", service);

        }).catch((err) => {
            res.send('data not found')
        })

    },




    //from me
    delete: async (req, res) => {
        const id = req.params.id;
        const deletedService = await ServiceModel.findByIdAndDelete(id);
        const idx = deletedService.image.indexOf("images/")
        const imageName = deletedService.image.substr(idx)

        fs.unlinkSync('./' + imageName)
        if (deletedService === undefined) {
            res.status(404).send("Service not found");
        } else {
            res.status(203).send({
                data: deletedService,
                message: "Service deleted successfully",
            });
        }

    },


       edit: async (req, res) => {
        const id = req.params.id;
        const title = req.body.title;
        const desc = req.body.desc;
       
      
        let updatedService = await ServiceModel.findById(id);
      
        if (!updatedService) {
          return res.status(404).send("Service not found");
        }
      
       
        const idx = updatedService.image.indexOf("images/");
        const imageName = updatedService.image.substr(idx);
      
        if (req.file) {
         
          fs.unlinkSync('./' + imageName);
      
          const updatedUrl = req.protocol + '://' + req.get('host');
          updatedService.image = updatedUrl + '/images/' + req.file.filename;
        }
      
        
        updatedService.title = title;
        updatedService.desc = desc;
    
      
        await updatedService.save();
      
        res.status(203).send({
          data: updatedService,
          message: "Service updated successfully",
        });
      }
      

}

module.exports = ServiceController