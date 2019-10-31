const multer = require('multer');
const boardsController = require('../../controllers/boards');
const checkAuthentication = require('../../middleware/checkAuthentication');

const load = multer({ storage: multer.memoryStorage() });

module.exports = (app) => {
    app.get('/api/v1/boards', checkAuthentication, boardsController.getAll);
    app.get('/api/v1/boards/:id', checkAuthentication, boardsController.getOne);
    app.get('/api/v1/boards/:id/files', checkAuthentication, boardsController.getFiles);
    app.post('/api/v1/boards', checkAuthentication, boardsController.create);
    app.post('/api/v1/boards/:id/files', checkAuthentication, load.array('files', 1), boardsController.uploadFiles);
    app.post('/api/v1/boards/:id/share', checkAuthentication, boardsController.share);
    app.post('/api/v1/boards/:id/files/remove', checkAuthentication, boardsController.removeFiles);
    app.put('/api/v1/boards/:id/files', checkAuthentication, boardsController.moveFiles);
    app.delete('/api/v1/boards/:id', checkAuthentication, boardsController.remove);
};