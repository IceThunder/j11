var controllers = {
  user: {
    db: "users",
    input: {
      "id": 1,
      "name": 1,
      "phone": 1,
      "sex": 0
    }
  },
  order: {
    db: "orders",
    input: {
      "id": 1,
      "price": 1,
      "remark": 0
    }
  }
},
server = {
  url:"mongodb://localhost:27017/j11p",
  serverOptions: {
    auto_reconnect:false,
    poolSize:100
  }
};

module.exports.controllers = controllers;
module.exports.server = server;
