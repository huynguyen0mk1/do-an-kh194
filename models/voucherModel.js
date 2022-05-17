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
Voucher.getAVoucherWithCode = (info, result) => {
  sql.query(
    "SELECT DISTINCT `id`, `id_apply`, `name`, `code_voucher`, `description`, `date_start`, `date_end`, `percent`, `max_value`, `image`, `create_date` FROM `voucher` WHERE code_voucher=? and NOW() between date_start and date_end",
    [info.code_voucher],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, {
          status: true,
          data:
            res.length > 0
              ? {
                  ...res[0],
                  date_end: new Date(res[0].date_end)
                    .toISOString()
                    .slice(0, 16),
                }
              : undefined,
        });
      }
    }
  );
};
Voucher.getAVoucherWithCodeInListId = (info, listID, result) => {
  sql.query(
    `SELECT DISTINCT id, id_apply, name, code_voucher, description, date_start, date_end, percent, max_value, image, create_date FROM voucher WHERE code_voucher=? and id_apply in (${listID}) and NOW() between date_start and date_end`,
    [info.code_voucher],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, {
          status: res.length > 0 ? true : false,
          data:
            res.length > 0
              ? {
                  ...res[0],
                  date_end: new Date(res[0].date_end)
                    .toISOString()
                    .slice(0, 16),
                }
              : undefined,
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
Voucher.getUseVoucher = (info, result) => {
  sql.query(
    "SELECT `id`, `id_vouncher`, `id_apply`, `precent`, `max_value`, `date_use`, `price`, `id_order`, `table_name` FROM `use_voucher` WHERE `id`=?",
    [info.code],
    (err, res) => {
      if (err) {
        result(err, {
          status: false,
          Message: err.sqlMessage,
          data: undefined,
        });
      } else {
        if (res.length === 0) result(null, { status: false });
        else result(null, { status: true, data: res[0] });
      }
    }
  );
};
Voucher.newVoucher = (info, result) => {
  Voucher.getAVoucherWithCode(info, (errVoucher, resultVoucher) => {
    if (errVoucher) result(resultVoucher);
    else {
      console.log(resultVoucher);
      if (resultVoucher.data === undefined) {
        sql.query("INSERT INTO `voucher` set ?", info, (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage });
          } else {
            result(null, { status: true });
          }
        });
      }
    }
  });
};
Voucher.newUseVoucher = (info, result) => {
  sql.query("INSERT INTO `use_voucher` set ?", info, (err, res) => {
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
Voucher.update_use_voucher = (info, result) => {
  console.log(info);
  sql.query(
    "UPDATE use_voucher SET id_order=? WHERE id=?",
    [info.id_order, info.code],
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
