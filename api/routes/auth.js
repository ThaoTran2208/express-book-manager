var express = require('express');

var controller = require('../controllers/auth');

var router = express.Router();

router.post('/login', controller.postlogin);

module.exports = router;