const filesController = require('../../controllers/files');
const checkAuthentication = require('../../middleware/checkAuthentication');

module.exports = (app) => {
    app.get('/api/v1/files', checkAuthentication, filesController.getAll);
    app.delete('/api/v1/files', checkAuthentication, filesController.remove);
}