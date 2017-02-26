var express = require('express');
var parser = require('body-parser');
var config = require('./conf/config').controllers;
var filter = require('./framework/filter');
var inputcheck = require('./framework/inputcheck');
var db = require('./data/db/index');
var app = express();

app.use('/', parser.json());
app.use('/', parser.urlencoded({extended: true}));

app.use('/:controller', filter.controllers);

app.get('/:controller/:id', function(req, res) {
  db.mongofind(config[req.params.controller].db, {"id": req.params.id}, function(result){
    res.send(result);
  });
});

app.post('/:controller', function(req, res) {
  var mybody = inputcheck.check(req, function(result){
    res.send({"message":"bad request","code":"400","more":result});
  });
  if (mybody != null){
    db.mongoinsert(config[req.params.controller].db, mybody, function(result){
      res.send(result);
    });
  }
});

app.post('/:controller/:id', function(req, res) {
  var mybody = inputcheck.check(req, function(result){
    res.send({"message":"bad request","code":"400","more":result});
  });
  if (mybody != null){
    db.mongoupdate(config[req.params.controller].db, {"id": req.params.id}, mybody, function(result){
      res.send(result);
    });
  }
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
