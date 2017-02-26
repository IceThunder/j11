var config = require('../conf/config').controllers;

/**
* controllers check
*
* tl_kid 2017.02.26 cteated
*/
module.exports.controllers = function(req,res,next){
  var controller = req.params.controller;
  // 访问判定
  if("undefined" == typeof(config[controller])){
    res.send({"message":"bad request","code":"400","more":"controller"});
    return;
  }
  next();
}
