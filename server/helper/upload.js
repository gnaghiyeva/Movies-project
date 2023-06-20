const multer = require('multer')
const uuid = require('uuid')

const DIR = './images/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid.v4() + '-' + fileName)
    }
});

module.exports =  upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// //videos

// //videos dir
// const VideoDIR = './videos/';
// const videostorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, VideoDIR);
//     },
//     filename: (req, file, cb) => {
//         const videofileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuid.v4() + '-' + videofileName)
//     }
// });

// module.exports = videoUpload = multer({
//     storage: videostorage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "video/mp4") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .mp4 format allowed!'));
//         }
//     }
// })



