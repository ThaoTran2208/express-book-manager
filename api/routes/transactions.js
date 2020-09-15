var express = require('express');

var controller = require('../controllers/transactions')

const router = express.Router();

router.get("/transactions", controller.getTransactions);

module.exports = router;