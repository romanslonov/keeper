const imagesController = require('../../controllers/images');
const checkAuthentication = require('../../middleware/checkAuthentication');

module.exports = (app) => {
    app.get('/api/v1/images', checkAuthentication, imagesController);
}