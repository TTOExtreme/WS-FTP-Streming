

const fs = require("fs");
const path = require('path')

const ABSPATH = path.join(__dirname + "/../ftp/");

const get = (require, response) => {
    response.status(200);

    // responsepond with json
    response.send({ data: list() });
}

const list = () => {
    let files = fs.readdirSync(ABSPATH); // You can also use the async method
    let filesWithStats = [];
    if (files.length > 1) {
        let sorted = files.sort((a, b) => {
            let s1 = fs.statSync(ABSPATH + a);
            let s2 = fs.statSync(ABSPATH + b);
            return s1.ctime < s2.ctime;
        });
        sorted.forEach(file => {
            filesWithStats.push(fs.readFileSync(ABSPATH + file + "/text.json", "utf-8"));
        });
    } else {
        files.forEach(file => {
            filesWithStats.push(fs.readFileSync(ABSPATH + file + "/text.json", "utf-8"));
        });
    }
    return filesWithStats;
}

module.exports = get;