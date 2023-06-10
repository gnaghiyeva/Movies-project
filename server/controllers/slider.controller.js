const SliderModel = require('../models/slider.model')

const fs = require('fs')

const sharp = require("sharp")
const sliderController = {
  post: async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const newSlider = new SliderModel({
      name: req.body.name,
      imageURL: url + '/images/' + req.file.filename,
    });
    await newSlider.save();
    res.status(201).send("created");
  },

  getAll: async (req, res) => {
    const sliders = await SliderModel.find();
    res.status(200).send({
      data: sliders,
      message: 'data get success'
    })
  },

  getByID: async (req, res) => {
    const id = req.params.id;
    SliderModel.findById(id).then((slider) => {
      res.status(200).send({
        data: slider,
        message: 'data get success'
      })
    }).catch((err) => {
      res.send('data not found')
    })
    console.log("slider found: ", slider);

  },


  delete: async (req, res) => {
    const id = req.params.id;
    const deletedSlider = await SliderModel.findByIdAndDelete(id);
    const idx = deletedSlider.imageURL.indexOf("images/")
    const imageName = deletedSlider.imageURL.substr(idx)
    await SliderModel.deleteMany({ sliderID: id });
    fs.unlinkSync('./' + imageName)
    if (deletedSlider === undefined) {
      res.status(404).send("slider not found");
    } else {
      res.status(203).send({
        data: deletedSlider,
        message: "slider deleted successfully",
      });
    }
  },


  edit: async (req, res) => {
    try {
      const id = req.params.id;
      const { imageURL } = req.body;
  
      const existedSlider = await SliderModel.findByIdAndUpdate(
        id,
        { $set: { imageURL: imageURL } },
        { new: true }
      );
  
      if (!existedSlider) {
        return res.status(404).send("Slider not found!");
      }
  
      console.log('Updated slider:', existedSlider);
  
      res.status(200).send({
        data: existedSlider,
        message: "Slider updated successfully!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating slider");
    } 
  },

};

module.exports = sliderController