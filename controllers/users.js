const shortid = require('shortid');

var User = require('../models/users');

var Transaction = require('../models/transactions');

module.exports.getindex = async (req,res) => {
  
  var page = parseInt(req.query.page) || 1;
  var perPage = 10;
  
  var start = (page - 1) * perPage;
  var end = page * perPage;
  
  var users = await User.find();
  var numOfUsers = users.length;
  
  res.render('users/index', {
    users: users.slice(start, end),
    currentPage: page,
    pages: Math.ceil(numOfUsers / perPage)
  });
};

module.exports.postindex = async (req, res) => {
  req.body.id = shortid.generate();
  req.body.password = '123123';
  req.body.isAdmin = false;
  req.body.wrongPasswordCount = 0;
  await User.create(req.body);
  res.redirect('/users');
};

module.exports.getedit = async (req, res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  res.render('users/edit', {
    user: user
  });
};

module.exports.postedit = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {name: req.body.name});
  res.redirect('/users');
};

module.exports.getdelete = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Transaction.findByIdAndDelete(req.params.id);
  res.redirect('/users');
};