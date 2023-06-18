const PricingModel = require('../models/pricing.model')

const pricingController = {
    getAll: async (req, res) => {
        const { className } = req.query
        const allPricing = await PricingModel.find();
        if (className === undefined) {
            res.status(200).send({
                data: allPricing,
                message: "pricing get success!"
            })
        }
        else {
            res.status(200).send({
                data: allPricing.filter((x) => x.className.toLowerCase().trim().includes(className.toLowerCase().trim())),
                message: "pricing get success!"
            })
        }
    },

    getByID: async (req, res) => {
        const id = req.params.id;
        PricingModel.findById(id).then((model) => {
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
        const className = req.body.className
        const price = req.body.price
        const videoQuality = req.body.videoQuality
        const resolution = req.body.resolution
        const screen = req.body.screen

        const existedPricing = await PricingModel.findByIdAndUpdate(id,{className:className, price:price, videoQuality:videoQuality, resolution:resolution, screen:screen})
        if(existedPricing==undefined){
          res.status(204).send('pricing not found')
        }
        else{
          res.status(200).send('pricing edited succesfuly')
        }
    },
    post: async (req, res) => {
        const newPricing = new PricingModel({
            className: req.body.className,
            price:req.body.price,
            videoQuality:req.body.videoQuality,
            resolution:req.body.resolution,
            screen:req.body.screen
        });
        await newPricing.save();
        res.status(201).send("created");
    },

}

module.exports = pricingController