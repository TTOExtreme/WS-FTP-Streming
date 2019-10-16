const express = require('express');
const router = express.Router();
const colors = require("colors");
const path = require("path");

router.post('/list', require('./podcasts/select'));
router.post("/list-all", require('./podcasts/select-all'));
router.post('/listBiggerBox', require('./podcasts/selectBiggerBox'));
router.post('/login', require('./user/login'));
router.post('/uploadAudioFiles', require("../audio/uploadFiles"));
router.post('/uploadAudioData', require("../audio/uploadData"));

module.exports = router;
