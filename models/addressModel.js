"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Address = function (address) {
  this.id = order.id;
};

Address.newAddress = (info, data, result) => {
  
      sql.query("INSERT INTO addresses set ?", info, (err, res) => {
        if (err) {
          console.log(err.sqlMessage);
          result(err, { status: false, Message: err.sqlMessage });
        } else {
          sql.query("INSERT INTO list_address set ?", data, (err, res) => {
            if (err) {
              console.log(err.sqlMessage);
              result(err, { status: false, Message: err.sqlMessage });
            } else {
              result(null, { status: true });
            }
          });
        }
      });
  
};

module.exports = Address;
