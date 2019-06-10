const express = require('express');
const https = require('https');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

fs.readdirSync(`${__dirname}/routes/v1`).forEach((file) => {
    require(`./routes/v1/${file}`)(app);
});

// Serve vue static files
app.use(express.static(path.resolve(__dirname, '../../frontend/dist/')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
});

app.use((err, req, res, next) => {
    if (err) {
        logger('There was an error 😲', 'error', err.stack);
        throw err;
    }

    next();
});

https
    .createServer({
        key: fs.readFileSync('app/security/key.pem'), 
        cert: fs.readFileSync('app/security/cert.pem'),
    }, app)
    .listen(3000, () => {
        console.log('Server running at https://localhost:3000');
    });