const bcypher = require('../util/bcypher');


module.exports = (ctx, res) => {
    //console.log(ctx);
    if (ctx.body) {
        if (ctx.body["user"]) {
            let user = ctx.body["user"];
            if (ctx.body["pass"]) {
                let pass = bcypher.sha512(ctx.body["pass"]);
                sql(user, pass, (data) => {
                    res.status(200);
                    //res.writeHead(200, { 'Content-Type': 'application/json' })
                    data.pass = "";
                    res.send(data);
                },
                    (data) => {
                        res.status(401);
                        res.send({});
                    })
            }
        }
    }
}


var db = require('../connector/connector');
var fs = require('fs');
var colors = require('colors');

function sql(user, pass, ok, error) {
    let sql = "SELECT * FROM WS_Podcast._Users  WHERE `user`='" + user + "' AND `pass`='" + pass + "';";
    //console.log(colors.green(sql + "\n"));
    db.query(sql, function (err, results, fields) {
        if (err) { console.log(colors.red("[ERROR] on " + __dirname + __filename + ":\n") + err); error(data); return; }
        let data = [];
        results.forEach(element => {
            data.push(JSON.parse(JSON.stringify(element)));
        });
        if (!data[0]) { error(data); return; }
        ok(data[0]);
    });
};