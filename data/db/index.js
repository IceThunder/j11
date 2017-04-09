var config = require('../../conf/config').server;
var mongoc = require('mongodb').MongoClient;

function mongologincheck(hash, callback){
  mongoc.connect(config.dbUrl, function(err, db){
    console.log("[INFO][" + "mongologincheck" + "]Start[" + hash + "]");
    if(err) {
      console.log(err);
      return;
    }
    db.collection("users").findOne({"hash":hash}, function(err, user){
      if(err) {
        console.log(err);
        return;
      }
      if(null != user){
        console.log("[INFO][" + "mongologincheck" + "]Success");
        callback();
      } else {
        console.log("[INFO][" + "mongologincheck" + "]Fail[user login expired]");
        callback("user login expired");
      }
    });
  });
};

function mongofind(name, search, callback){
  mongoc.connect(config.dbUrl, function(err, db){
    console.log("[INFO][" + "mongofind" + "]Start[" + name + "," + search + "]");
    if(err) {
      console.log(err);
      return;
    }
    if("users" != name) {
      db.collection(name).find(search,{"_id":0}).toArray(function(err, result) {
        if (err) {
          console.log(err);
          return;
        }
        db.close();
        console.log("[INFO][" + "mongofind" + "]Success");
        callback({"message":"success","code":"200",result});
      });
    } else {
      console.log("[INFO][" + "mongofind" + "]Fail[users is protected]");
      callback({"message":"bad request","code":"400","more":"users is protected"});
    }
  });
};

function mongoinsert(name, value, callback) {
  console.log("[INFO][" + "mongoinsert" + "]Start[" + name + "," + value + "]");
  mongoc.connect(config.dbUrl, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    if("users" != name){
      db.collection('sequence').update({"name":name},{"$inc":{"code" : 1}}, {upsert:true}, function(err, addseq){
        if(err) {
          console.log(err);
          return;
        }
        db.collection('sequence').findOne({"name":name}, function(err, queryseq){
          if(err) {
            console.log(err);
            return;
          }
          value.id = queryseq.code;
          db.collection(name).insert(value, function(err, result){
            if(err) {
              console.log(err);
              return;
            }
            db.close();
            if(1 == result.result.ok){
              console.log("[INFO][" + "mongoinsert" + "]Success");
              callback({"message":"success","code":"200","id":queryseq.code});
            } else {
              console.log("[INFO][" + "mongoinsert" + "]Fail[" + result + "]");
              callback({"message":"fail","code":"500","more":result});
            }
          });
        });
      });
    } else {
      console.log("[INFO][" + "mongoinsert" + "]Fail[users is protected]");
      callback({"message":"bad request","code":"400","more":"users is protected"});
    }
  });
};

function mongoupdate(name, search, value, callback){
  console.log("[INFO][" + "mongoupdate" + "]Start[" + name + "," + search + "," + value + "]");
  mongoc.connect(config.dbUrl, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    if("users" != name){
      db.collection(name).update(search, {"$set": value}, function(err, result){
        if(err) {
          console.log(err);
          return;
        }
        db.close();
        if(1 == result.result.ok){
          console.log("[INFO][" + "mongoupdate" + "]Success");
          callback({"message":"success","code":"200","id":result.id});
        } else {
          console.log("[INFO][" + "mongoupdate" + "]Fail[" + result + "]");
          callback({"message":"fail","code":"500","more":result});
        }
      });
    } else {
      console.log("[INFO][" + "mongoupdate" + "]Fail[users is protected]");
      callback({"message":"bad request","code":"400","more":"users is protected"});
    }
  });
};

function mongoquery(name, search, page, callback) {
  console.log("[INFO][" + "mongoquery" + "]Start[" + name + "," + search + "]");
  mongoc.connect(config.dbUrl, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    if("users" != name){
      if(search.hash!=null && search.hash != "" && search.hash != "undefined"){
        delete search.hash;
      }
      db.collection(name).find(search, {"_id":0}).skip(5 * (page - 1)).limit(5).toArray(function(err, result){
        if(err) {
          console.log(err);
          return;
        }
        db.close();
        console.log("[INFO][" + "mongoquery" + "]Success");
        callback({"message":"success","code":"200", result});
      });
    } else {
      console.log("[INFO][" + "mongoquery" + "]Fail[users is protected]");
      callback({"message":"bad request","code":"400","more":"users is protected"});
    }
  });
};

function mongologin(value, callback){
  console.log("[INFO][" + "mongologin" + "]Start[" + value + "]");
  mongoc.connect(config.dbUrl, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    db.collection('users').findOne({"name":value.name,"password":value.password}, function(err, result){
      if(err) {
        console.log(err);
        return;
      }
      if(null != result){
        db.collection('users').update({"id":result.id}, {"$set":{"hash": value.hash}}, function(err, updateuser){
          if(err){
            console.log(err);
            return;
          }
          if(1 == updateuser.result.ok){
            console.log("[INFO][" + "mongologin" + "]Success");
            callback({"message":"success","code":"200","id":result.id,"hash":value.hash});
          } else {
            console.log("[INFO][" + "mongologin" + "]Fail[" + updateuser + "]");
            callback({"message":"fail","code":"500","more":updateuser});
          }
        });
      }
    });
  });
};

function mongoregister(value, callback) {
  console.log("[INFO][" + "mongoregister" + "]Start[" + value + "]");
  mongoc.connect(config.dbUrl, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    db.collection('users').findOne({"name":value.name}, function(err, result){
      if(err){
        console.log(err);
        return;
      }
      if(null == result){
        db.collection('sequence').update({"name":"users"},{"$inc":{"code" : 1}}, {upsert:true}, function(err, addseq){
          if(err) {
            console.log(err);
            return;
          }
          db.collection('sequence').findOne({"name":"users"}, function(err, queryseq){
            if(err) {
              console.log(err);
              return;
            }
            value.id = queryseq.code;
            db.collection('users').insert(value, function(err, adduser){
              if(err) {
                console.log(err);
                return;
              }
              db.close();
              if(1 == adduser.result.ok){
                console.log("[INFO][" + "mongoregister" + "]Success");
                callback({"message":"success","code":"200","id":value.id,"hash":value.hash});
              } else {
                console.log("[INFO][" + "mongoregister" + "]Fail[" + adduser + "]");
                callback({"message":"fail","code":"500","more":adduser});
              }
            });
          });
        });
      } else {
        console.log("[INFO][" + "mongoregister" + "]Fail[username already exists]");
        callback({"message":"bad request","code":"400","more":"username already exists"});
      }
    });
  });
};

function mongoauthupdate(value, callback){
  console.log("[INFO][" + "mongoauthupdate" + "]Start[" + value + "]");
  mongoc.connect(config.dbUrl, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    db.collection('users').findOne({"hash":value.hash}, function(err, result){
      if(err) {
        console.log(err);
        return;
      }
      if(null != result){
        db.collection('users').update({"id":result.id}, {"$set":value}, function(err, queryuser){
          if(err){
            console.log(err);
            return;
          }
          if(1 == queryuser.result.ok){
            console.log("[INFO][" + "mongoauthupdate" + "]Success");
            callback({"message":"success","code":"200"});
          } else {
            console.log("[INFO][" + "mongoauthupdate" + "]Fail[" + queryuser + "]");
            callback({"message":"fail","code":"500","more":queryuser});
          }
        });
      } else {
        console.log("[INFO][" + "mongoauthupdate" + "]Fail[user login expired]");
        callback({"message":"bad request","code":"400","more":"user login expired"});
      }
    });
  });
};

function mongopwd(body, callback){
  console.log("[INFO][" + "mongopwd" + "]Start[" + body + "]");
  mongoc.connect(config.dbUrl, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    db.collection("users").update(
      {"hash":body.hash,"password":body.old_password},
      {"$set":{"password" : body.new_password}}, function(err, result) {
      if(err) {
        console.log(err);
        return;
      }
      db.close();
      if(1 != result.result.ok) {
        console.log("[INFO][" + "mongopwd" + "]Fail[" + result + "]");
        callback({"message":"fail","code":"500","more":result});
      } else if(1 == result.result.n){
        console.log("[INFO][" + "mongopwd" + "]Success");
        callback({"message":"success","code":"200"});
      } else {
        console.log("[INFO][" + "mongopwd" + "]Fail[old password is wrong]");
        callback({"message":"bad request","code":"400","more":"old password is wrong"});
      }
    });
  });
}

function mongoauthinfo(hash, callback){
  console.log("[INFO][" + "mongoauthinfo" + "]Start[" + body + "]");
  mongoc.connect(config.dbUrl, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    db.collection("users").find({"hash":hash},{"_id":0}).toArray(function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      db.close();
      console.log("[INFO][" + "mongoauthinfo" + "]Success");
      callback({"message":"success","code":"200",result});
    });
  });
};

module.exports.mongologincheck = mongologincheck;
module.exports.mongofind = mongofind;
module.exports.mongoinsert = mongoinsert;
module.exports.mongoupdate = mongoupdate;
module.exports.mongoquery = mongoquery;
module.exports.mongologin = mongologin;
module.exports.mongoregister = mongoregister;
module.exports.mongoauthupdate = mongoauthupdate;
module.exports.mongopwd = mongopwd;
module.exports.mongoauthinfo = mongoauthinfo;
