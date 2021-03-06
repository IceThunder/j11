var express = require('express');
var parser = require('body-parser');
var oauth = require('./authentication/index');
var config = require('./conf/config').controllers;
var system = require('./conf/config').system;
var filter = require('./framework/filter');
var inputcheck = require('./framework/inputcheck');
var db = require('./data/db/index');
var app = express();

app.use('/', parser.json());
app.use('/', parser.urlencoded({extended: true}));

app.post('/auth/:controller', oauth.verify);

app.use('/list/:controller', filter.lists);
app.use('/list/:controller/：page', filter.lists);

app.post('/list/:controller', function(req, res) {
  if(req.body == {}){
    res.send({"message":"bad request","code":"400","more":"must has condition"});
  }
  db.mongoquery(config[req.params.controller].db, req.body, 1, function(result){
    res.send(result);
  });
});
app.post('/list/:controller/:page', function(req, res) {
  if(req.body == {}){
    res.send({"message":"bad request","code":"400","more":"must has condition"});
  }
  db.mongoquery(config[req.params.controller].db, req.body, req.params.page, function(result){
    res.send(result);
  });
});

app.use('/:controller', filter.controllers);
app.use('/:controller', oauth.loginstate);

app.get('/:controller/:id', function(req, res) {
  db.mongofind(config[req.params.controller].db, {"id": +req.params.id}, function(result){
    res.send(result);
  });
});

app.post('/:controller/:id', function(req, res) {
  db.mongofind(config[req.params.controller].db, {"id": +req.params.id}, function(result){
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
    db.mongoupdate(config[req.params.controller].db, {"id": +req.params.id}, mybody, function(result){
      res.send(result);
    });
  }
});

app.listen(system.port, function() {
  console.log('Listening on port ' + system.port);
});
