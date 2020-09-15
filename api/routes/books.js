var express = require('express');

var controller = require('../controllers/books')

var router = express.Router();

router.get('/books', controller.getindex);

module.exports = router;