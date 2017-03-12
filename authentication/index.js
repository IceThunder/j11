var check = require('./check');
var auth = require('./auth');
var db = require('../data/db/index');
var controllers = require('../conf/config').controllers;
var listconfig = require('../conf/config').querylist;

function login(req, res, next){
  var result = '';
  check.logincheck(req, function(res){
    result = res;
  });
  if(result != ''){
    res.send({"message":"bad request","code":"400","more":result});
  } else {
    db.mongologin(req.body, function(result){
      res.send(result);
    });
  }
};

function register(req, res, next){
  var result = '';
  check.registercheck(req, function(res){
    result = res;
  });
  if(result != ''){
    res.send({"message":"bad request","code":"400","more":result});
  } else {
    db.mongoregister(req.body, function(result){
      res.send(result);
    });
  }
};

function update(req, res, next){
  var result = '';
  check.updatecheck(req, function(res){
    result = res;
  });
  if(result != ''){
    res.send({"message":"bad request","code":"400","more":result});
  } else {
    db.mongoauthupdate(req.body, function(result){
      res.send(result);
    });
  }
};

function info(req, res, next){
  var result = '';
  check.infocheck(req, function(res){
    result = res;
  });
  if(result != ''){
    res.send({"message":"bad request","code":"400","more":result});
  } else {
    db.mongoauthinfo(req.body.hash, function(result){
      res.send(result);
    });
  }
};

function pwd(req, res, next){
  var result = '';
  check.pwdcheck(req, function(res){
    result = res;
  });
  if(result != ''){
    res.send({"message":"bad request","code":"400","more":result});
  } else {
    db.mongopwd(req.body, function(result){
      res.send(result);
    });
  }
};

function oauth(req, res, next){
  res.send({"message":"bad request","code":"400","more":"sorry, not supported now"});
};

module.exports.verify = function (req, res, next) {
  var controller = req.params.controller;
  if (auth.auth_login == controller) {
    login(req, res, next);
  } else if (auth.auth_register == controller) {
    register(req, res, next);
  } else if (auth.auth_update == controller) {
    update(req, res, next);
  } else if (auth.auth_info == controller) {
    info(req, res, next);
  } else if (auth.auth_pwd == controller) {
    pwd(req, res, next);
  } else if (auth.auth_oauth == controller) {
    oauth(req, res, next);
  } else {
    res.send({"message":"bad request","code":"400","more":"auth controller error"});
  }
};

module.exports.loginstate = function (req, res, next) {
  var result = '';
  if(1 == controllers[req.params.controller].auth){
    check.logincheck(req, function(res){
      result = res;
    });
    if(result != ''){
      db.mongologincheck(req.body.hash, function(res){
        result = res;
      });
    }
  }
  if(result != ''){
    res.send({"message":"access forbidden","code":"403","more":result});
  } else {
    next();
  }
};
