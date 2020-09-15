var cloudinary = require('cloudinary').v2;

var User = require('../models/users');

module.exports.index = async (req, res) => {
  res.render('profile/index', {
    user : await User.findById(req.signedCookies.userId),
    values: req.body
  });
}

module.exports.postindex = async (req, res) => {
  
  await User.findByIdAndUpdate(req.signedCookies.userId, {
    name: req.body.name, 
    phone: req.body.phone, 
    password: req.body.password
  });
  res.redirect('/profile');
};

module.exports.getavatar = async (req, res) => {
  res.render('profile/avatar', {
    user : await User.findById(req.signedCookies.userId)
  });
}

module.exports.postavatar = (req, res) => {
  req.body.avatar = req.file.path.split("/").slice(1).join("/");
  
  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    req.body.avatar = result.url;
    await User.findByIdAndUpdate(req.signedCookies.userId, {avatar: req.body.avatar });
    
    res.redirect("/profile");
  });
}
