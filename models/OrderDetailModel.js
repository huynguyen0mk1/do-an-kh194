"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var OrderDetail = function (orderDetail) {
  this.id = orderDetail.id;
};

OrderDetail.newOrderDetail = (info, result) => {
  let data = [];
  for (let i in info) {
    for (let j in info[i]) {
      data.push(info[i][j]);
    }
  }
  for (let i in data) {
    sql.query("INSERT INTO orders_detail set ?", data[i], (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      }
    });
  }
  result(null, { status: true });
};

OrderDetail.deleteOrderDetail = (info, result) => {
  sql.query(
    "DELETE FROM `orders_detail` WHERE `id_order` LIKE  ?",
    info.concat("%"),
    (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      } else result(null, { status: true });
    }
  );
};

module.exports = OrderDetail;
