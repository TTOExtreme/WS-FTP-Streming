const fs = require("fs");
const colors = require("colors");
const path = require("path");

const multer = require('multer');

const postStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname + '/../../ftp/uploaded/'));
    },
    filename: function (req, file, callback) {
        let fileName = '', postName;
        if (typeof req.body.postName !== "undefined") {
            postName = req.body.postName.toLowerCase().replace(/ /g, '-');
            filename += postName;
        }
        if (file.fieldname == "img")
            fileName += "image-";
        if (file.fieldname == "audio")
            fileName += "audio-";

        fileName += file.originalname;
        callback(null, fileName);
    }
});

function reciever(req, res, next) {
    const uploadPost = multer({ storage: postStorage }).any();
    uploadPost(req, res, function (err) {
        if (err) {
            console.log(colors.red("[Error]" + err.message))
            return res.end("error uploading file");
        }
        console.log("End")
        res.status(200);
        res.send("ended");
        //res.end("file uploaded");
    });
}
module.exports = reciever;