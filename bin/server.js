// server.js
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const fs = require("fs");
const getStat = require('util').promisify(fs.stat);
const path = require('path')


function init() {
    server.listen(8000);
    console.log('Server Started on 8000');


    app.use('/home/', express.static(path.join(__dirname + '/../web/home/')));
    app.use('/img/', express.static(path.join(__dirname + '/../ftp/teste/')));
    //app.use('/data/', require("./routes").routes());
    app.get('/list', require("./list"));

    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname + '/../web/home/index.html'))
    });
    app.use('*', (request, response) => {
        response.status(404);

        // responsepond with json
        if (request.accepts('json')) {
            response.send({ error: 'Not found' });
            return;
        }

        // default to plain-text. send()
        response.type('txt').send('Not found');
    });

    //app.listen(3000, () => console.log('app is running'));
}

module.exports = { init }