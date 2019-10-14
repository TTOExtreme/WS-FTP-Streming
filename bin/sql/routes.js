var express = require('express');
var router = express.Router();

router.post('/login', require('./user/login'));

module.exports = router;
