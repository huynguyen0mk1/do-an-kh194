"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Shop = function (shop) {
  this.name = shop.name;
};

Shop.getAllWithUser = (info, result) => {
  sql.query(
    "SELECT s.id, s.name, c.name AS name_category, s.is_activate, s.phone_number, s.address FROM shops s INNER JOIN categorys c on c.id = s.id_category INNER JOIN users u on u.id = s.id_user WHERE u.code = ?",
    [info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};
Shop.getAllShop = (info, result) => {
  sql.query(
    "SELECT s.id, s.name, c.name AS name_category, s.is_activate, s.phone_number, s.address FROM shops s INNER JOIN categorys c on c.id = s.id_category INNER JOIN users u on u.id = s.id_user",

    (err, res) => {
      if (err) {
        result(err, { status: false, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};
module.exports = Shop;
