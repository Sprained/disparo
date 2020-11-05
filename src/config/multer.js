const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
        filename: (req, file, cb) => {
            return cb(null, file.originalname);
        }
    })
}