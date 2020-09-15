var Book = require('../../models/books');

module.exports.getindex = async (req, res) => {
  res.json(await Book.find());
};