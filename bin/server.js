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


    app.use('/', express.static(path.join(__dirname + '/../web/')));

    // 10 * 1024 * 1024 // 10MB
    // usamos um buffer minúsculo! O padrão é 64k
    const highWaterMark = 2;

    app.get('/audio', async (req, res) => {

        const filePath = path.join(__dirname + '/../ftp/audio/audio.ogg');
        const stat = await getStat(filePath);
        //  console.log(stat);

        // informações sobre o tipo do conteúdo e o tamanho do arquivo
        res.writeHead(200, {
            'Content-Type': 'audio/ogg',
            'Content-Length': stat.size
        });

        const stream = fs.createReadStream(filePath, { highWaterMark });

        // só exibe quando terminar de enviar tudo
        stream.on('end', () => console.log('acabou'));

        // faz streaming do audio 
        stream.pipe(res);
    });

    app.get('/video', function (req, res) {
        const fpath = path.join(__dirname + '/../ftp/video/video.mp4');
        const stat = fs.statSync(fpath)
        const fileSize = stat.size
        const range = req.headers.range
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(fpath, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(fpath).pipe(res)
        }
    });

    //app.listen(3000, () => console.log('app is running'));
}

module.exports = { init }