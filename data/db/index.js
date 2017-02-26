var config = require('../../conf/config').server;
var mongoc = require('mongodb').MongoClient;

function mongofind(name, search, callback){
  mongoc.connect(config.url, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    db.collection(name).find(search).toArray(function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      db.close();
      callback(result);
    });
  });
};

function mongoinsert(name, value, callback) {
  mongoc.connect(config.url, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    db.collection(name).insert(value, function(err, result){
      if(err) {
        console.log(err);
        return;
      }
      db.close();
      callback(result);
    });
  });
};

function mongoupdate(name, search, value, callback){
  mongoc.connect(config.url, function(err, db){
    if(err) {
      console.log(err);
      return;
    }
    db.collection(name).update(search, value, function(err, result){
      if(err) {
        console.log(err);
        return;
      }
      db.close();
      callback(result);
    });
  });
};

module.exports.mongofind = mongofind;
module.exports.mongoinsert = mongoinsert;
module.exports.mongoupdate= mongoupdate;
