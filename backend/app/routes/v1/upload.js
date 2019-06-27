const multer = require('multer');
const crypto = require('crypto');
const uploadController = require('../../controllers/upload');
const checkAuthentication = require('../../middleware/checkAuthentication');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const hash = crypto.createHash('md5').update(file.originalname).digest('hex');
        cb(null, `${hash}.${file.originalname.split('.').pop()}`);
    },
});
const load = multer({ storage });

module.exports = (app) => {
    app.post('/api/v1/upload', checkAuthentication, load.array('files', 100), uploadController);
}