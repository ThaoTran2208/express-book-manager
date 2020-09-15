var bcrypt = require('bcrypt');
var sgMail = require('@sendgrid/mail');

var User = require('../../models/users');


module.exports.postlogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  
  var user = await User.findOne({email});
  
  var values = req.body;
  if(!user){
    res.json(['User dose not exist!'], values);
    return;
  }
  
  if (user.wrongPasswordCount >= 3){
    res.json(['You have entered the wrong password more than 3 times!',
        'Your account has been locked!'], values);
    
    var msg = {
      to: user.email,
      from: 'bichchungab11@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'You have entered the wrong password more than 3 times!',
      html: 'Your account has been locked!</strong>',
    }

    sgMail.send(msg)
    
    return;
  }
  
  var salt = bcrypt.genSaltSync(10);
  
  if (!(await bcrypt.compare(password, user.password))){
    await User.findByIdAndUpdate(user.id, {
      wrongPasswordCount: user.wrongPasswordCount += 1
    });
    res.json(['Wrong password!'], values);
    return;
  } 
  
  res.json({ login: true });
  
}