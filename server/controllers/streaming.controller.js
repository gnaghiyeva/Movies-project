const StreamingModel = require('../models/streaming.model')

const streamingController = {
    getAll: async (req, res) => {
        const { title } = req.query
        const allStreaming = await StreamingModel.find();
        if (title === undefined) {
            res.status(200).send({
                data: allStreaming,
                message: "streaming get success!"
            })
        }
        else {
            res.status(200).send({
                data: allStreaming.filter((x) => x.title.toLowerCase().trim().includes(title.toLowerCase().trim())),
                message: "categories get success!"
            })
        }
    },

    getByID: async (req, res) => {
        const id = req.params.id;
        StreamingModel.findById(id).then((model) => {
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
        const title = req.body.title
        const desc = req.body.desc
        const link = req.body.link
        const existedStreaming = await StreamingModel.findByIdAndUpdate(id,{title:title, desc:desc, link:link})
        if(existedStreaming==undefined){
          res.status(204).send('streaming not found')
        }
        else{
          res.status(200).send('streaming edited succesfuly')
        }
    },
    post: async (req, res) => {
        const newStreaming = new StreamingModel({
            title: req.body.title,
            desc:req.body.desc,
            link:req.body.link

        });
        await newStreaming.save();
        res.status(201).send("created");
    },




}

module.exports = streamingController