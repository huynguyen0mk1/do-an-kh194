"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Voucher = function (voucher) {
  this.name = shop.name;
};

Voucher.getAVoucher = (info, result) => {
  sql.query(
    "SELECT DISTINCT `id`, `id_apply`, `name`, `code_voucher`, `description`, `date_start`, `date_end`, `percent`, `max_value`, `image`, `create_date` FROM `voucher` WHERE id=?",
    [info.id],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, {
          status: true,
          data: {
            ...res[0],
            date_end: new Date(res[0].date_end).toISOString().slice(0, 16),
          },
        });
      }
    }
  );
};
Voucher.getProductVoucher = (info, result) => {
  sql.query(
    "SELECT DISTINCT `id`, `id_apply`, `name`, `code_voucher`, `description`, date_format(date_start,'%d/%m/%Y %T') AS date_start,  date_format(date_end,'%d/%m/%Y %T') AS date_end, `percent`, `max_value`, `image`, `create_date` FROM `voucher` WHERE id_apply=?",
    [info.id_apply],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};
Voucher.newVoucher = (info, result) => {
  sql.query("INSERT INTO `voucher` set ?", info, (err, res) => {
    if (err) {
      result(err, { status: false, Message: err.sqlMessage });
    } else {
      result(null, { status: true });
    }
  });
};
Voucher.updateVoucher = (info, result) => {
  sql.query(
    "UPDATE voucher SET name=?,code_voucher=?,description=?,date_start=?,date_end=?,percent=?,max_value=?,image=? WHERE id=? and id_apply =?",
    [
      info.name,
      info.code_voucher,
      info.description,
      info.date_start,
      info.date_end,
      info.percent,
      info.max_value,
      info.image,
      info.id,
      info.id_apply,
    ],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage });
      } else {
        result(null, { status: true });
      }
    }
  );
};
Voucher.deleteVoucher = (info, result) => {
  sql.query(
    "DELETE FROM `voucher` WHERE id=? and id_apply =?",
    [info.id, info.id_apply],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage });
      } else {
        result(null, { status: true });
      }
    }
  );
};
module.exports = Voucher;
