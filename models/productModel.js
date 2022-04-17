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
    "SELECT `id`, `name`, `id_shop`, `code`, `name_user`, `shop_name`, `id_category`, `category_name`, `full_description`, `short_description`, `price`, `total`, `main_image`, `is_activate`, `create_date` FROM `allproduct`",
    (err, res) => {
      if (err) {
        result(err, { status: false, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};
Product.getAllProductUser = (info, result) => {
  sql.query(
    "SELECT `id`, `name`, `id_shop`, `code`, `name_user`, `shop_name`, `id_category`, `category_name`, `full_description`, `short_description`, `price`, `total`, `main_image`, `is_activate`, `create_date` FROM `allproduct` WHERE code = ?",
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
Product.getAProductUser = (info, result) => {
  sql.query(
    "SELECT `id`, `name`, `id_shop`, `code`, `name_user`, `shop_name`, `id_category`, `category_name`, `full_description`, `short_description`, `price`, `total`, `main_image`, `is_activate`, `create_date` FROM `allproduct` WHERE id = ? and code = ?",
    [info.id, info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, data: [] });
      } else {
        result(null, { status: true, data: res[0] });
      }
    }
  );
};
Product.newProduct = (info, result) => {
  sql.query("INSERT INTO `products` set ?", info, (err, res) => {
    if (err) {
      result(err, { status: false });
    } else {
      result(null, { status: true });
    }
  });
};
Product.deleteProduct = (info, result) => {
  sql.query("DELETE FROM `products` WHERE id =?", [info.id], (err, res) => {
    if (err) {
      result(err, { status: false });
    } else {
      result(null, { status: true });
    }
  });
};
Product.updateStatusProduct = (info, result) => {
  sql.query(
    "UPDATE `products` SET is_activate = is_activate*(-1) WHERE id = ?",
    [info.id],
    (err, res) => {
      if (err) {
        result(err, { status: false });
      } else {
        result(null, { status: true });
      }
    }
  );
};
Product.updateProduct = (info, result) => {
  sql.query(
    "UPDATE `products` set name=?, full_description=?, short_description=?, price=?, total=?, main_image=?,id_shop=?,id_category=? WHERE id =?",
    [
      info.name,
      info.full_description,
      info.short_description,
      info.price,
      info.total,
      info.main_image,
      info.id_shop,
      info.id_category,
      info.id,
    ],
    (err, res) => {
      if (err) {
        result(err, { status: false });
      } else {
        result(null, { status: true });
      }
    }
  );
};

module.exports = Product;
