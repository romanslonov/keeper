const checkAuthentication = require('../../middleware/checkAuthentication');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const boardsController = require('../../controllers/boards');


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
    app.post('/api/v1/upload', checkAuthentication, load.array('files', 100), boardsController.uploadFiles);
}