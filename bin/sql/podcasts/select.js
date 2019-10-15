const bcypher = require('../util/bcypher');
var db = require('../connector/connector');
var fs = require('fs');
var colors = require('colors');

module.exports = (req, res) => {
    let offset = 0;
    if (req.body.offset) {
        offset = req.body.offset;
    }
    let sql = "SELECT * FROM WS_Podcast._Podcasts WHERE biggerbox=0 ORDER BY id DESC LIMIT 20 OFFSET " + offset + " ;";
    let data = [];
    db.query(sql, function (err, results, fields) {
        if (err) { console.log(colors.red("[ERROR] on " + __dirname + __filename + ":\n") + err); return; }
        results.forEach(element => {
            data.push(JSON.parse(JSON.stringify(element)));
        });
        if (!data[0]) { return; }
        res.status(200);
        res.send(data);
    });
}
