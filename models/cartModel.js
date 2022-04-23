"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Cart = function (cart) {
  this.id = cart.id;
};

Cart.deleteCart = (info, result) => {
  sql.query(
    "DELETE FROM `cart` WHERE id_user = ? and id_product  = ?",
    [info.user_id, info.product_id],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage });
      } else {
        result(null, { status: true });
      }
    }
  );
};

Cart.changeCart = (info, result) => {
  sql.query(
    "SELECT id, amount, id_user,id_product FROM cart WHERE id_user = ? and id_product  = ?",
    [info.user_id, info.product_id],
    (err, res) => {
      if (err) {
        result(err, { status: false });
      } else {
        if (res.length === 0) {
          sql.query(
            "INSERT INTO `cart` set ?",
            {
              id: md5(new Date().getTime().toString()),
              amount: 1,
              id_user: info.user_id,
              id_product: info.product_id,
            },
            (err1, res1) => {
              if (err1) {
                result(err1, { status: false });
              } else {
                result(null, { status: true });
              }
            }
          );
        } else {
          sql.query(
            "UPDATE cart SET amount = amount+1 WHERE id=?",
            [res[0].id],
            (err1, res1) => {
              if (err1) {
                result(err1, { status: false });
              } else {
                result(null, { status: true });
              }
            }
          );
        }
      }
    }
  );
};

module.exports = Cart;
