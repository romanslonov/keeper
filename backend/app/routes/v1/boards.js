const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const boardsController = require('../../controllers/boards');
const checkAuthentication = require('../../middleware/checkAuthentication');

const s3 = new AWS.S3({
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
    Bucket: process.env.BUCKET_NAME,
    endpoint: process.env.BUCKET_ENDPOINT,
});

const load = multer({
    storage: multerS3({
        s3,
        bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            cb(null, `${file.mimetype.split('/')[0]}/${Date.now().toString()}.${file.originalname.split('.').pop()}`)
        },
    }),
});

module.exports = (app) => {
    app.get('/api/v1/boards', checkAuthentication, boardsController.getAll);
    app.get('/api/v1/boards/:id', checkAuthentication, boardsController.getOne);
    app.get('/api/v1/boards/:id/files', checkAuthentication, boardsController.getFiles);
    app.post('/api/v1/boards', checkAuthentication, boardsController.create);
    app.post('/api/v1/boards/:id/files', checkAuthentication, load.array('files', 100), boardsController.uploadFiles);
    app.post('/api/v1/boards/:id/share', checkAuthentication, boardsController.share);
    app.delete('/api/v1/boards/:id', checkAuthentication, boardsController.remove);
    app.delete('/api/v1/boards/:id/files', checkAuthentication, boardsController.removeFiles);
    app.put('/api/v1/boards/:id/files', checkAuthentication, boardsController.moveFiles);
}