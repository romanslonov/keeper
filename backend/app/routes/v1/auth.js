const { register, login } = require('../../controllers/auth');

module.exports = (app) => {
    app.post('/api/v1/register', register);
    app.post('/api/v1/login', login);
}