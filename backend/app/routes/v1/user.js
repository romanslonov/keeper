const userController = require('../../controllers/user')

module.exports = (app) => {
    app.get('/api/v1/profile', userController.profile);
}