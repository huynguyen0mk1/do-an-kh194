"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Category = function (category) {
  this.name = shop.name;
};

Category.getAllParent = (result) => {
  sql.query(
    "SELECT id, name FROM categorys WHERE parent_id = null or parent_id = ''",
    (err, res) => {
      if (err) {
        result(err, { status: false, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};
Category.getAllCategory = (result) => {
  sql.query("SELECT id, name, parent_id FROM categorys", (err, res) => {
    if (err) {
      result(err, { status: false, data: [] });
    } else {
      result(null, { status: true, data: res });
    }
  });
};
module.exports = Category;
