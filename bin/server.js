// server.js
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const fs = require("fs");
const getStat = require('util').promisify(fs.stat);
const path = require('path')
const bodyParser = require('body-parser');



function init() {
    server.listen(8000);
    console.log('Server Started on 8000');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())

    app.use('/home/', express.static(path.join(__dirname + '/../web/home/')));
    app.use('/login/', express.static(path.join(__dirname + '/../web/login/')));
    app.use('/upload/', express.static(path.join(__dirname + '/../web/upload/')));
    app.use('/data/', express.static(path.join(__dirname + '/../ftp/')));
    //app.use('/data/', require("./routes").routes());

    app.get('/list', require("./list"));


    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname + '/../web/home/index.html'))
    });
    app.get('/login', (request, response) => {
        response.sendFile(path.join(__dirname + '/../web/login/index.html'))
    });
    app.get('/upload', (request, response) => {
        response.sendFile(path.join(__dirname + '/../web/upload/index.html'))
    });

    app.use('/api/', require("./sql/routes.js"));

    app.use('*', (request, response) => {
        response.status(404);
        if (request.accepts('json')) {
            response.send({ error: 'Not found' });
            return;
        }
        response.type('txt').send('Not found');
    });
}

module.exports = { init }