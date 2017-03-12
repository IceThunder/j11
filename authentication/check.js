var crypto = require('crypto');
var config = require('../conf/config');

module.exports.logincheck = function(req, callback) {
  // get values with allow save
  if(req.body.name==null || req.body.name == "" || req.body.name == "undefined"){
    callback("name is not valid");
    return;
  }
  if(req.body.password==null || req.body.password == "" || req.body.password == "undefined"){
    callback("password is not valid");
    return;
  }
  req.body.hash = crypto.createHmac('sha256', config.system.secret)
      .update(req.body.name + req.body.password + new Date().toLocaleString())
      .digest('hex');
};

module.exports.registercheck = function (req, callback) {
  // get values with allow save
  if(req.body.name==null || req.body.name == "" || req.body.name == "undefined"){
    callback("name is not valid");
    return;
  }
  if(req.body.password==null || req.body.password == "" || req.body.password == "undefined"){
    callback("password is not valid");
    return;
  }
  req.body.hash = crypto.createHmac('sha256', config.system.secret)
      .update(req.body.name + req.body.password + new Date().toLocaleString())
      .digest('hex');
};

module.exports.updatecheck = function (req, callback) {
  // get values with allow save
  if(req.body.hash==null || req.body.hash == "" || req.body.hash == "undefined"){
    callback("hash is not valid");
    return;
  }
  if(req.body.name!=null && req.body.name != "" && req.body.name != "undefined"){
    delete req.body.name;
  }
  if(req.body.password!=null && req.body.password != "" && req.body.password != "undefined"){
    delete req.body.password;
  }
};

module.exports.infocheck = function (req, callback) {
  if(req.body.hash==null || req.body.hash == "" || req.body.hash == "undefined"){
    callback("hash is not valid");
    return;
  }
};

module.exports.pwdcheck = function (req, callback) {
  if(req.body.old_password==null || req.body.old_password == "" || req.body.old_password == "undefined"){
    callback("old password is not valid");
    return;
  }
  if(req.body.new_password==null || req.body.new_password == "" || req.body.new_password == "undefined"){
    callback("new password is not valid");
    return;
  }
  if(req.body.hash==null || req.body.hash == "" || req.body.hash == "undefined"){
    callback("hash is not valid");
    return;
  }
};

module.exports.oauthcheck = function (req, callback) {

};

module.exports.logincheck = function (req, callback) {
  if(req.body.hash==null || req.body.hash == "" || req.body.hash == "undefined"){
    callback("hash is not valid");
    return;
  }
};
