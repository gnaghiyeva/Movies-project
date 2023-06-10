const SliderModel = require('../models/slider.model')

const fs = require('fs')
const path = require('path')

const sliderController = {
  post: async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const newSlider = new SliderModel({
      name: req.body.name,
      image: url + '/images/' + req.file.filename,
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
      console.log("slider found: ", slider);

    }).catch((err) => {
      res.send('data not found')
    })

  },


  delete: async (req, res) => {
    const id = req.params.id;
    const deletedSlider = await SliderModel.findByIdAndDelete(id);
    const idx = deletedSlider.image.indexOf("images/")
    const imageName = deletedSlider.image.substr(idx)
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
      const image = req.file.image
      console.log(image)

      const existedSlider = await SliderModel.findById(
        id,
        { image: image },
        { new: true }
      );

      existedSlider.save()
      if (!existedSlider) {
        return res.status(404).send("Slider not found!");
      }

      const idx = existedSlider.image.indexOf("images/");
      const imageName = existedSlider.image.substr(idx);

      console.log('IMG URL:', existedSlider.image);
      console.log('idx:', idx);
      console.log('Deleted slide:', existedSlider.image);

      res.status(200).send({
        data: imageName,
        message: "Slider updated successfully!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating slider");
    }

    // try {
    //   const id = req.params.id;
    //   const { image } = req.body;

    //   const existedSlider = await SliderModel.findById(id,{image:image});
    //   if (!existedSlider) {
    //     return res.status(404).send("Slider not found!");
    //   }

    //   const idx = existedSlider.image.indexOf("images/");
    //   const imageName = existedSlider.image.substr(idx);
    //   console.log('guncellenmeden evvel',image)

    //   const updatedSlider = await SliderModel.findByIdAndUpdate(
    //     id,
    //     { $set: { image: image } },
    //     { new: true }
    //   );

    //   if (!updatedSlider) {
    //     return res.status(500).send("Error updating slider");
    //   }

    //   console.log('imageName1',imageName)
    //   fs.unlinkSync('./' + imageName); // Delete the previous image file
    //   console.log('imageName2',imageName)

    //   res.status(200).send("Slider updated successfully!");

    //   console.log('guncellenmeden evvel',existedSlider)
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send("Error updating slider");
    // }

  },

}

module.exports = sliderController