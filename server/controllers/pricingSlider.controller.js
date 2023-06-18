const pricingSliderModel = require('../models/pricingSlider.model')

const fs = require('fs')
const path = require('path')
const imagesDIR = path.join(__dirname, "..")

const pricingSliderController = {
  
  post: async (req, res) => {
     const url = req.protocol + '://' + req.get('host');
     const newPricingSlider = new pricingSliderModel({
      name: req.body.name,
      image:  url + '/images/'+ req.file.filename,
    });
    await newPricingSlider.save();
    res.status(201).send("created");
  },


  getAll: async (req, res) => {
    const pricingSliders = await pricingSliderModel.find();
    res.status(200).send({
      data: pricingSliders,
      message: 'data get success'
    })
  },

  getByID: async (req, res) => {
    const id = req.params.id;
    pricingSliderModel.findById(id).then((slider) => {
      res.status(200).send({
        data: slider,
        message: 'data get success'
      })
      console.log("slider found: ", slider);

    }).catch((err) => {
      res.send('data not found')
    })

  },


  //from me
  delete: async (req, res) => {
    const id = req.params.id;
    const deletedPricingSlider = await pricingSliderModel.findByIdAndDelete(id);
    const idx = deletedPricingSlider.image.indexOf("images/")
    const imageName = deletedPricingSlider.image.substr(idx)
   
    fs.unlinkSync('./'+imageName)
    if (deletedPricingSlider === undefined) {
      res.status(404).send("slider not found");
    } else {
      res.status(203).send({
        data: deletedPricingSlider,
        message: "slider deleted successfully",
      });
    }


    
  },




  //from me
  edit: async (req, res) => {
    const id = req.params.id;
    const name = req.body.name
    const existedPricingSlider = await pricingSliderModel.findByIdAndDelete(id,{name:name});
    const idx = existedPricingSlider.image.indexOf("images/")
    const imageName = existedPricingSlider.image.substr(idx)
   
    fs.unlinkSync('./'+imageName)
    if (existedPricingSlider === undefined) {
      res.status(404).send("slider not found");
    } else {
      res.status(203).send({
        data: existedPricingSlider,
        message: "slider updated successfully",
      });
    }


    const updatedUrl = req.protocol + '://' + req.get('host');
    const updatedPricingSlider = new pricingSliderModel({
      
      name: req.body.name,
      image: updatedUrl+'/images/'+ req.file.filename,
    });

    await updatedPricingSlider.save();
   
  },

}

module.exports = pricingSliderController