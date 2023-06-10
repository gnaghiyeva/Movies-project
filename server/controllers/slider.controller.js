const SliderModel = require('../models/slider.model')

const fs = require('fs')
const path = require('path')
const imagesDIR = path.join(__dirname, "..")

const sliderController = {
  post: async (req, res) => {
    const newSlider = new SliderModel({
      name: req.body.name,
      image: req.file.filename,
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
    // console.log(id)
    try {
      const deletedSlider = await SliderModel.findOne({_id:id})
      console.log(deletedSlider)
      // const idx = deletedSlider.image.indexOf("images/")

      // await SliderModel.deleteMany({ sliderID: id });
      // sen her kodda eyni sehvi etmisen evvelce emeliyyati gorursen sonra sliderin varligini yoxlayirsan

      const imageName = deletedSlider.image
      console.log(imagesDIR)
      fs.unlinkSync(`${imagesDIR}/images/${imageName}`)
      await SliderModel.findByIdAndDelete(id);
      res.status(203).send({
        data: deletedSlider,
        message: "slider deleted successfully",
      });
    }
    catch {
      res.status(404).send("slider not found");
    }
  },


  edit: async (req, res) => {
    try {
      const id = req.params.id;
      const image = req.file.filename

      const existedSlider = await SliderModel.findOne({_id:id});
      fs.unlinkSync(`${imagesDIR}/images/${existedSlider.image}`)
      if (!existedSlider) {
        return res.status(404).send("Slider not found!");
      }
      existedSlider.image = image

      existedSlider.save()



      // const idx = existedSlider.image.indexOf("images/");
      // const imageName = existedSlider.image.substr(idx);

      // console.log('IMG URL:', existedSlider.image);
      // console.log('idx:', idx);
      // console.log('Deleted slide:', existedSlider.image);

      res.status(200).send({
        data: existedSlider, // sen bayaq seklin adina g yazmisdin sonrada deyirdin g hardan gelir
        message: "Slider updated successfully!",
      });
    } catch (error) {
      console.error(error);
      res.status(404).send("Error updating slider");
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