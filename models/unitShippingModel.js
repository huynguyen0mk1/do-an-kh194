"user strict";
var sql = require("./db.js");
var Unit = function (unit) {
  this.name = unit.name;
};

Unit.newShippingUnit = (info, result) => {
  
      sql.query("INSERT INTO shipping_unit set ?", info, (err, res) => {
        if (err) {
          result(err, { status: false, Message: err.sqlMessage });
        } else {
          result(null, { status: true });
        }
      });
  
};
Unit.listShippingUnit = (info, result) => {
  
      sql.query(
        "SELECT `id`, `name`, `id_shop`, `name_shop`, `description`, `price`, `code`, `full_name` FROM `unitshippingofshop` WHERE code=?",
        [info.code],
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage });
          } else {
            result(null, { status: true, data: res });
          }
        }
      );
  
};
Unit.getAShippingUnit = (info, result) => {
  
      sql.query(
        "SELECT `id`, `name`, `id_shop`, `name_shop`, `description`, `price`, `code`, `full_name` FROM `unitshippingofshop` WHERE id =? and code=?",
        [info.id, info.code],
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage });
          } else {
            result(null, { status: true, data: res[0] });
          }
        }
      );
  
};
Unit.updateShippingUnit = (info, result) => {
  
      sql.query(
        "UPDATE shipping_unit SET name=?,id_shop=?,description=?,price=? WHERE id=?",
        [info.name, info.id_shop, info.description, info.price, info.id],
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage });
          } else {
            result(null, { status: true });
          }
        }
      );
  
};
Unit.deleteShippingUnit = (info, result) => {
  
      sql.query(
        "DELETE FROM `shipping_unit` WHERE id=?",
        [info.id],
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage });
          } else {
            result(null, { status: true });
          }
        }
      );
  
};
module.exports = Unit;
