const Router = require('koa-router');
const express = require('express');

const fs = require("fs");
const getStat = require('util').promisify(fs.stat);
const path = require('path')

const router = new Router();

router.get('*', function (req, res) {
    const fpath = path.join(__dirname + '/../../ftp/video/video.mp4');
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


module.exports = router;