
const multer = require('multer')
const uuid = require('uuid')

//videos dir
const VideoDIR = './videos/';
const videostorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, VideoDIR);
    },
    filename: (req, file, cb) => {
        const videofileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid.v4() + '-' + videofileName)
    }
});

module.exports = videoUpload = multer({
    storage: videostorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "video/mp4") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .mp4 format allowed!'));
        }
    }
})