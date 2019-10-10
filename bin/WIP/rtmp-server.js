const RtmpServer = require('rtmp-server');
const rtmpServer = new RtmpServer();
const { spawn } = require('child_process');
const path = require('path');
const fs = require("fs");
const randomstring = require("randomstring");

function init() {
    /*
    const NodeMediaServer = require('node-media-server');

    const config = {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 30,
            ping_timeout: 60
        },
        http: {
            port: 8001,
            allow_origin: '*'
        }
    };

    var nms = new NodeMediaServer(config)
    nms.run();
//*/


    rtmpServer.on('error', err => {
        throw err;
    });

    rtmpServer.on('client', client => {


        const folder = path.join(__dirname + "/../ftp/video/" + streamName + "");
        var key = randomstring.generate(7);
        /*
        client.on('command', command => {
            console.log(command.cmd, command);
        });
        //*/

        client.on('connect', () => {
            console.log('connect', client.app);
        });

        client.on('play', ({ streamName }) => {
            console.log('PLAY', streamName);
        });

        client.on('publish', ({ streamName }) => {
            console.log('PUBLISH', streamName);
            while (fs.existsSync(folder + "-" + key)) {
                key = randomstring.generate(7);
            }
            fs.mkdirSync(folder + "-" + key)
            const opts = [
                '-listen', '1', '-i', 'rtmp://localhost:1935/live', '-c', 'copy', '-map', '0',
                '-f', 'segment', '-segment_time', '10', '-segment_format', 'mp4',
                path.join(folder + "-" + key + "/%05d.mp4")
            ]

            videoEncoder = spawn('ffmpeg', opts);

            videoEncoder.on('exit', function (code, signal) {
                console.log('videoEncoder process exited with ' +
                    `code ${code} and signal ${signal}`);
            });

            videoEncoder.stdout.on('data', (data) => {
                console.log(`child stdout:\n${data}`);
            });

            //ffmpeg -listen 1 -i rtmp://localhost:1935/live -c copy -map 0 -f segment -segment_time 10 -segment_format mp4 "./WS-FTP-Streming/ftp/video/teste%03d.mp4"
            // ffmpeg -re -listen 1 -i rtmp://localhost:1935/live -r 5 -t 10 ./WS-FTP-Streming/ftp/video/teste.mp4
        });

        client.on('stop', () => {
            console.log('client disconnected');
        });
    });

    rtmpServer.listen(1935);
    //*/
}
module.exports = { init }