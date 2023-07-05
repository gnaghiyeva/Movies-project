const multer = require('multer');
const uuid = require('uuid');

// Şarkılar dizini
const SongDIR = './songs/';
const songstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, SongDIR);
  },
  filename: (req, file, cb) => {
    const songfileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuid.v4() + '-' + songfileName);
  },
});

module.exports = songUpload = multer({
  storage: songstorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Sadece .mp3 formatı kabul edilir!'));
    }
  },
});
