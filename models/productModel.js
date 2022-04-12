"user strict";
var sql = require("./db.js");
var Product = function (product) {
  this.name = product.name;
};

Product.getAllProductInShop = (info, result) => {
  sql.query(
    "SELECT p.`id`, p.`name`, p.`id_shop`, s.name AS name_shop , p.`id_category`,c.name AS name_category, p.`full_description`, p.`short_description`, p.`price`, p.`total`, p.`main_image`, p.`is_activate`, p.`create_date` FROM `products` p INNER JOIN shops s ON s.id = p.id_shop INNER JOIN categorys c ON c.id = p.id_category Where p.id_shop = ?",
    [info.id_shop],
    (err, res) => {
      if (err) {
        result(err, { status: false, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};
Product.getAllProduct = (info, result) => {
  sql.query(
    "SELECT p.`id`, p.`name`, p.`id_shop`, s.name AS name_shop , p.`id_category`,c.name AS name_category, p.`full_description`, p.`short_description`, p.`price`, p.`total`, p.`main_image`, p.`is_activate`, p.`create_date` FROM `products` p INNER JOIN shops s ON s.id = p.id_shop INNER JOIN categorys c ON c.id = p.id_category",

    (err, res) => {
      if (err) {
        result(err, { status: false, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};

module.exports = Product;
