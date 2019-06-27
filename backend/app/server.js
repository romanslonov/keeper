const dotenv = require('dotenv');
const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const helmet = require('helmet');

dotenv.config();

app.use('/uploads', express.static('uploads'));
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

if (process.env.NODE_ENV === 'production') {
    http
        .createServer(app)
        .listen(process.env.PORT, process.env.HOSTNAME, () => {
            console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}`);
        });
} else {
    https
    .createServer({
        key: fs.readFileSync('app/security/server.key'), 
        cert: fs.readFileSync('app/security/server.crt'),
    }, app)
    .listen(process.env.PORT, () => {
        console.log('Server running at https://localhost:3000');
    });
}