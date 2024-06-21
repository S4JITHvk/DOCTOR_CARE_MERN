const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath;
        if (file.fieldname === 'voiceMessage') {
            uploadPath = path.join(__dirname, '../public/voicemessages');
        } else if (file.fieldname === 'image') {
            uploadPath = path.join(__dirname, '../public/images');
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

module.exports = storage;
