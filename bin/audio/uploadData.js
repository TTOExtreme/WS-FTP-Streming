const fs = require("fs");
const colors = require("colors");
const path = require("path");
const ffmpeg = require('fluent-ffmpeg');

function moveFile(req, res) {
    if (req.body) {
        if (req.body.folder) {
            let folderPath = path.join(__dirname + "/../../ftp/" + req.body.folder);
            let upPath = path.join(__dirname + "/../../ftp/uploaded/");
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            if (req.body.fileAudio) {
                if (fs.existsSync(upPath + "/audio-" + req.body.fileAudio)) {
                    //todo: use ffmpeg to rework audio-file
                    let track = upPath + "/audio-" + req.body.fileAudio;//your path to source file

                    ffmpeg(track)
                        .toFormat('mp3')
                        .audioBitrate("96")
                        .on('error', (err) => {
                            console.log('An error occurred: ' + err.message);
                        })
                        .on('progress', (progress) => {
                            // console.log(JSON.stringify(progress));
                            //console.log('Processing: ' + progress.percent + ' % converted');
                            //res.status(200);
                            //res.write(JSON.stringify({ percent: progress.percent }));
                        })
                        .on('end', () => {
                            console.log('Processing finished !');
                            res.status(200);
                            res.send(JSON.stringify({ percent: 100 }));
                            res.end();
                        })
                        .save(folderPath + "/audio.mp3");//path where you want to save your file
                    //fs.renameSync(upPath + "/audio-" + req.body.fileAudio, folderPath + "/audio.mp3")
                }
            }
            if (req.body.fileImg) {
                if (fs.existsSync(upPath + "/image-" + req.body.fileImg)) {
                    //todo: use ffmpeg to rework audio-file
                    fs.renameSync(upPath + "/image-" + req.body.fileImg, folderPath + "/image.png")
                }

            }
            require("../sql/podcasts/add")(req.body.title, req.body.description, req.body.biggerbox, req.body.folder);
        }
    }
}

module.exports = moveFile;