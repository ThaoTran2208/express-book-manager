const Transaction = require("../../models/transactions");

module.exports.getTransactions = async (req, res) => {
    res.json(await Transaction.find());
};
