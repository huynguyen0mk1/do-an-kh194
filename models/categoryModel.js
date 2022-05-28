"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Category = function (category) {
  this.name = shop.name;
};

Category.getAllParent = (result) => {
  
      sql.query(
        "SELECT id, name, description FROM categorys WHERE parent_id = null or parent_id = ''",
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage, data: [] });
          } else {
            result(null, { status: true, data: res });
          }
        }
      );
  
};
Category.getACategory = (info, result) => {
  
      sql.query(
        "SELECT `id`, `name`, `parent_id`, `description`, `image`, percent, max_value FROM `categorys` WHERE id = ?",
        [info.id],
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage, data: [] });
          } else {
            result(null, { status: true, data: res[0] });
          }
        }
      );
  
};
Category.getListCategoryShop = (info, result) => {
  
      sql.query(
        "SELECT c.`id`, c.`name` FROM `categorys` c WHERE id = (SELECT shops.id_category FROM shops INNER JOIN users ON users.id=shops.id_user WHERE shops.id =? AND users.code =? ) OR c.parent_id = (SELECT shops.id_category FROM shops INNER JOIN users ON users.id=shops.id_user WHERE shops.id =? AND users.code =? )",
        [info.id, info.code, info.id, info.code],
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage, data: [] });
          } else {
            result(null, { status: true, data: res });
          }
        }
      );
  
};

Category.getAllCategory = (result) => {
  
      sql.query(
        "SELECT `id`, `name`, `parent_name`, `description`, `image`, percent, max_value FROM `allcategorydetail`",
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage, data: [] });
          } else {
            result(null, { status: true, data: res });
          }
        }
      );
  
};
Category.getAllCategoryHot = (result) => {
  
      sql.query(
        "SELECT id, name, image FROM category_hot LIMIT 12",
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage, data: [] });
          } else {
            result(null, { status: true, data: res });
          }
        }
      );
  
};
Category.newCategory = (info, result) => {
  
      sql.query("INSERT INTO `categorys` set ?", info, (err, res) => {
        if (err) {
          console.log(err.sqlMessage);
          result(err, { status: false, Message: err.sqlMessage });
        } else {
          result(null, { status: true });
        }
      });
  
};
Category.updateCategory = (info, result) => {
  
      sql.query(
        "UPDATE categorys SET name=?,parent_id=?,description=?, percent=?, max_value=?, image=? WHERE id=?",
        info,
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage });
          } else {
            result(null, { status: true });
          }
        }
      );
  
};
Category.deleteCategory = (info, result) => {
  
      sql.query(
        "DELETE FROM `categorys` WHERE id = ?",
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

Category.getListCategorys = (result) => {
  
      sql.query(
        "SELECT `id`, `name`, `parent_id`, `description`, `image` FROM `allcategorydetail`",
        (err, res) => {
          if (err) {
            result(err, { status: false, Message: err.sqlMessage, data: [] });
          } else {
            if (res.length > 0) {
              let arr = [];
              arr = res
                .map((item) => {
                  if (
                    item.parent_id === null ||
                    item.parent_id === undefined ||
                    item.parent_id === ""
                  )
                    return {
                      ...item,
                      arr: res
                        .map((item1) => {
                          if (item1.parent_id === item.id) return item1;
                        })
                        .filter((item2) => item2 != null),
                    };
                })
                .filter((item3) => item3 != null);

              result(null, { status: true, data: arr });
            }
          }
        }
      );
  
};

module.exports = Category;
