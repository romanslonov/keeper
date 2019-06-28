const userController = require('../../controllers/user');
const checkAuthentication = require('../../middleware/checkAuthentication');

module.exports = (app) => {
    app.get('/api/v1/profile', checkAuthentication, userController);
}