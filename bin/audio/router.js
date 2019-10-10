const Router = require('koa-router');
const express = require('express');

const fs = require("fs");
const getStat = require('util').promisify(fs.stat);
const path = require('path')

const router = new Router();

router.get('*', async (req, res) => {
    const filePath = path.join(__dirname + '/../../ftp/audio/audio.ogg');
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

module.exports = router;