var config = require('../../conf/config').server;
var mongoc = require('mongodb').MongoClient;

function mongofind(name, search, callback){
  mongoc.connect(config.dbUrl, function(err, db){
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
        callback({"message":"success","code":"200",result});
      });
    } else {
      callback({"message":"bad request","code":"400","more":"users is protected!"});
    }
  });
};

function mongoinsert(name, value, callback) {
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
              callback({"message":"success","code":"200","id":queryseq.code});
            } else {
              callback({"message":"fail","code":"500","more":result});
            }
          });
        });
      });
    } else {
      callback({"message":"bad request","code":"400","more":"users is protected!"});
    }
  });
};

function mongoupdate(name, search, value, callback){
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
          callback({"message":"success","code":"200","id":result.id});
        } else {
          callback({"message":"fail","code":"500","more":result});
        }
      });
    } else {
      callback({"message":"bad request","code":"400","more":"users is protected!"});
    }
  });
};

function mongoquery(name, search, callback) {
  mongoc.connect(config.dbUrl, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    if("users" != name){
      db.collection(name).find(search, {"_id":0}).toArray(function(err, result){
        if(err) {
          console.log(err);
          return;
        }
        db.close();
        callback({"message":"success","code":"200", result});
      });
    } else {
      callback({"message":"bad request","code":"400","more":"users is protected!"});
    }
  });
};

function mongologin(value, callback){
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
            callback({"message":"success","code":"200","id":result.id,"hash":value.hash});
          } else {
            callback({"message":"fail","code":"500","more":updateuser});
          }
        });
      }
    });
  });
};

function mongoregister(value, callback) {
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
                callback({"message":"success","code":"200","id":value.id,"hash":value.hash});
              } else {
                callback({"message":"fail","code":"500","more":adduser});
              }
            });
          });
        });
      } else {
        callback({"message":"bad request","code":"400","more":"username already exists!"});
      }
    });
  });
};

function mongoauthupdate(value, callback){
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
            callback({"message":"success","code":"200"});
          } else {
            callback({"message":"fail","code":"500","more":queryuser});
          }
        });
      } else {
        callback({"message":"bad request","code":"400","more":"user login expired!"});
      }
    });
  });
};

function mongoauthinfo(hash, callback){
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
      callback({"message":"success","code":"200",result});
    });
  });
};

module.exports.mongofind = mongofind;
module.exports.mongoinsert = mongoinsert;
module.exports.mongoupdate = mongoupdate;
module.exports.mongoquery = mongoquery;
module.exports.mongologin = mongologin;
module.exports.mongoregister = mongoregister;
module.exports.mongoauthupdate = mongoauthupdate;
module.exports.mongoauthinfo = mongoauthinfo;
