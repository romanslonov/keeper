const authController = require('../../controllers/auth');

module.exports = (app) => {
    app.post('/api/v1/register', authController.regiser);
    app.post('/api/v1/login', authController.login);
}