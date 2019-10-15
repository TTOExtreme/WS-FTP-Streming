const bcypher = require('../util/bcypher');
var db = require('../connector/connector');
var fs = require('fs');
var colors = require('colors');

module.exports = (title, description, biggerbox, folder) => {
    let sql = "INSERT INTO WS_Podcast._Podcasts " +
        "(title,description,biggerbox,folder) VALUES " +
        "('" + title + "', '" + description + "', " + ((biggerbox) ? "1" : "0") + ", '" + folder + "')" +
        "; ";

    if (biggerbox) {
        db.query("UPDATE WS_Podcast._Podcasts SET biggerbox = 0 WHERE biggerbox = 1; ", function (err, results, fields) {
            if (err) { console.log(colors.red("[ERROR] on " + __dirname + __filename + ":\n") + err); return; }
            execute(sql);
            return;
        });
    } else {
        execute(sql);
    }
}

function execute(sql) {
    db.query(sql, function (err, results, fields) {
        if (err) { console.log(colors.red("[ERROR] on " + __dirname + __filename + ":\n") + err); return; }
    });
}