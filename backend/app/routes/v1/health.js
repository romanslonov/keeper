const healthcheck = require('express-healthcheck');

module.exports = (app) => {
    app.get(
        '/api/v1/health', 
        healthcheck({ 
            healthy: () => ({ status: "We're up and running healthy ✅" }),
        }),
    );
};