var controllers = {
  image: {
    db: "images",
    auth: 1,
    input: {
      "userid": 0,
      "url": 0,
      "delete": 0
    }
  },
  order: {
    db: "orders",
    auth: 1,
    input: {
      "price": 1,
      "remark": 0
    }
  }
},
querylist = {
  image:{auth:0},
  order:{auth:1}
},
server = {
  dbUrl:"mongodb://localhost:27017/j11p",
  dbServerOptions: {
    auto_reconnect:false,
    poolSize:100
  }
},
system = {
  port:3000,
  secret:"abcdefg"
};

module.exports.controllers = controllers;
module.exports.querylist = querylist;
module.exports.server = server;
module.exports.system = system;
