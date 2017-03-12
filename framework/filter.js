var config = require('../conf/config');
var auth = require('../authentication/index');

/**
* controllers check
*
* tl_kid 2017.02.26 cteated
*/
module.exports.controllers = function(req,res,next){
  var controller = req.params.controller;
  // 访问判定
  if("undefined" == typeof(config.controllers[controller])){
    res.send({"message":"bad request","code":"400","more":"controller"});
    return;
  }
  next();
};

module.exports.lists = function(req, res, next) {
  var list = req.params.controller;
  if("undefined" == typeof(config.querylist[list])){
    res.send({"message":"access forbidden","code":"403","more":"list access forbidden"});
  } else if(1 == config.querylist[list].auth){
    auth.loginstate(req, res, next);
  } else {
    next();
  }
};
