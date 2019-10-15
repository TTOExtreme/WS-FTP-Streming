const bcypher = require('../util/bcypher');
var db = require('../connector/connector');
var fs = require('fs');
var colors = require('colors');

module.exports = (req, res) => {
    let sql = "SELECT * FROM WS_Podcast._Podcasts WHERE biggerbox=1;";
    let data = [];
    db.query(sql, function (err, results, fields) {
        if (err) { console.log(colors.red("[ERROR] on " + __dirname + __filename + ":\n") + err); return; }
        results.forEach(element => {
            data.push(JSON.parse(JSON.stringify(element)));
        });
        if (!data[0]) { return; }
        res.send(data);
    });
}