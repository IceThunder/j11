var config = require('../conf/config').controllers;

module.exports.check = function(req, callback) {
  if(typeof(req.params.id) != "undefined"){
    if(req.params.id != req.body.id) {
      callback("id error");
      return;
    }
  }
  // get values with allow save
  var mybody = {};
  for(var item in config[req.params.controller].input){
    if(config[req.params.controller].input[item] == 1){
      if(req.body[item]==null || req.body[item] == "" || req.body[item] == "undefined"){
        callback(item);
        return;
      }
    }
    mybody[item]=req.body[item];
  }
  return mybody;
};
