const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const helmet = require('helmet');

dotenv.config();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

fs.readdirSync(`${__dirname}/routes/v1`).forEach((file) => {
    require(`./routes/v1/${file}`)(app);
});

app.get('*', (req, res) => res.status(404).json({
    message: "Seems like the endpoint you're looking for no longer exists 🤔",
}));

app.use((err, req, res, next) => {
    if (err) {
        logger('There was an error 😲', 'error', err.stack);
        throw err;
    }

    next();
});

const { PORT, HOSTNAME, NODE_ENV } = process.env;

http
    .createServer(app)
    .listen(PORT, HOSTNAME, () => {
        logger(`Server running at http://${HOSTNAME}:${PORT} in ${NODE_ENV} mode`);
    });