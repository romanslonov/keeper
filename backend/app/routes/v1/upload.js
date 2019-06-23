const multer = require('multer');
// const uploadController = require('../../controllers/upload'); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    },
});
const load = multer({ storage });

module.exports = (app) => {
    app.post('/api/v1/upload', load.array('files', 100), (req, res) => {
        console.log(req.files.length);
        res.status(200).json({
            files: req.files,
        });
    });
}