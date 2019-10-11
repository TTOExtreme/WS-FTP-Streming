const Router = require('koa-router');
const express = require('express');

const fs = require("fs");
const getStat = require('util').promisify(fs.stat);
const path = require('path')

const router = new Router();

// 10 * 1024 * 1024 // 10MB
// usamos um buffer minúsculo! O padrão é 64k
const highWaterMark = 65536;

router.get('*', async (ctx) => {
    const file = ctx.params[0];
    if (file) {
        const filePath = path.join(__dirname + '/../../ftp/' + file + '/audio.mp3');
        var stat = fs.statSync(filePath);
        var total = stat.size;
        if (ctx.request) {
            var range = ctx.request.headers.range;
            var parts = range.replace(/bytes=/, "").split("-");
            var partialstart = parts[0];
            var partialend = parts[1];

            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : total - 1;
            var chunksize = (end - start) + 1;
            var readStream = fs.createReadStream(filePath, { start: start, end: end });
            ctx.res.writeHead(206, {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
                'Content-Type': 'audio/mpeg'
            });
            readStream.pipe(ctx.res);
        } else {
            ctx.res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
            fs.createReadStream(filePath).pipe(ctx.res);
        }




        /*
        const filePath = path.join(__dirname + '/../../ftp/audio/audio.mp3');
        const stat = await getStat(filePath);
        //  console.log(stat);

        // informações sobre o tipo do conteúdo e o tamanho do arquivo
        ctx.res.writeHead(200, {
            'Content-Type': 'audio/mp3',
            'Content-Range': 'bytes * /' + stat.size,
        'Content-Length': stat.size
    });

const stream = fs.createReadStream(filePath, { highWaterMark });

// só exibe quando terminar de enviar tudo
stream.on('end', () => console.log('acabou'));

// faz streaming do audio 
stream.pipe(ctx.res);
        //*/
    }

});

module.exports = router;