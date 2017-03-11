var controllers = {
  image: {
    db: "images",
    auth: "",
    input: {
      "userid": 0,
      "url": 0,
      "delete": 0
    }
  },
  order: {
    db: "orders",
    auth: "",
    input: {
      "price": 1,
      "remark": 0
    }
  }
},
server = {
  dbUrl:"mongodb://localhost:27017/j11p",
  dbServerOptions: {
    auto_reconnect:false,
    poolSize:100
  }
},
system = {
  secret:"abcdefg"
};

module.exports.controllers = controllers;
module.exports.server = server;
module.exports.system = system;
