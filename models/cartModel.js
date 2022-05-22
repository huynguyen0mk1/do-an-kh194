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
Cart.deleteAllCartOfUser = (info, result) => {
  sql.query("DELETE FROM `cart` WHERE id_user = ? ", [info], (err, res) => {
    if (err) {
      result(err, { status: false, Message: err.sqlMessage });
    } else {
      result(null, { status: true });
    }
  });
};
Cart.deleteAllCartOfUserWithCode = (info, result) => {
  sql.query(
    "DELETE FROM `cart` WHERE `id_user` IN (SELECT DISTINCT u.id FROM users u WHERE u.code = ? )",
    [info],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage });
      } else {
        result(null, { status: true });
      }
    }
  );
};
Cart.deleteACart = (info, result) => {
  sql.query("DELETE FROM `cart` WHERE id = ? ", [info.id], (err, res) => {
    if (err) {
      result(err, { status: false, Message: err.sqlMessage });
    } else {
      result(null, { status: true });
    }
  });
};
Cart.getAllCart = (info, result) => {
  sql.query(
    "SELECT `id`, `amount`, `id_user`, `CODE`, `id_product`, `name_product`, `price`,`sale`, `max_sale`,total_amount, `main_image`, `id_shop`, `name_shop`, `id_unit_ship`, `name_unit_ship`, price_unit_ship, percent, max_value FROM `allcart` WHERE code = ?",
    [info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        let data = [];

        let listID = [];

        for (let i in res) {
          listID.push("'".concat(res[i].id_product).concat("'"));
          listID.push("'".concat(res[i].id_shop).concat("'"));
        }
        let i = 0;
        let id_order = md5(new Date().getTime().toString().concat(info.code));
        if (res.length > 0) {
          for (let item in res) {
            if (data.length === 0) {
              data.push({
                id_shop: res[item].id_shop,
                name_shop: res[item].name_shop,
                list_product: [],
                list_unit: [],
                total: 0,
                price_ship: 0,
                id_ship: "",
                id_order: id_order.concat("_" + i),
                percent: res[item].percent,
                max_value: res[item].max_value,
              });
              i++;
            } else {
              let numcheck = data.filter(
                (item1) => res[item].id_shop === item1.id_shop
              ).length;
              if (numcheck === 0) {
                data.push({
                  id_shop: res[item].id_shop,
                  name_shop: res[item].name_shop,
                  list_product: [],
                  list_unit: [],
                  total: 0,
                  price_ship: 0,
                  id_ship: "",
                  id_order: id_order.concat("_" + i),
                  percent: res[item].percent,
                  max_value: res[item].max_value,
                });
                i++;
              }
            }
            let n = data.length - 1;
            if (data[n].list_product.length === 0) {
              data[n].list_product.push({
                id: res[item].id,
                id_product: res[item].id_product,
                name_product: res[item].name_product,
                price:
                  (res[item].price * res[item].sale) / 100 > res[item].max_sale
                    ? res[item].price - res[item].max_sale
                    : (res[item].price * (100 - res[item].sale)) / 100,
                main_image: res[item].main_image,
                amount: res[item].amount,
                total_amount: res[item].total_amount,
              });
              if (res[item].amount <= res[item].total_amount)
                data[n].total +=
                  ((res[item].price * res[item].sale) / 100 > res[item].max_sale
                    ? res[item].price - res[item].max_sale
                    : (res[item].price * (100 - res[item].sale)) / 100) *
                  res[item].amount;
              else
                data[n].total +=
                  ((res[item].price * res[item].sale) / 100 > res[item].max_sale
                    ? res[item].price - res[item].max_sale
                    : (res[item].price * (100 - res[item].sale)) / 100) *
                  res[item].total_amount;
            } else {
              let numcheck = data[n].list_product.filter(
                (item1) => res[item].id_product === item1.id_product
              ).length;
              if (numcheck === 0) {
                data[n].list_product.push({
                  id: res[item].id,
                  id_product: res[item].id_product,
                  name_product: res[item].name_product,
                  price:
                    (res[item].price * res[item].sale) / 100 >
                    res[item].max_sale
                      ? res[item].price - res[item].max_sale
                      : (res[item].price * (100 - res[item].sale)) / 100,
                  main_image: res[item].main_image,
                  amount: res[item].amount,
                  total_amount: res[item].total_amount,
                });
                if (res[item].amount <= res[item].total_amount)
                  data[n].total +=
                    ((res[item].price * res[item].sale) / 100 >
                    res[item].max_sale
                      ? res[item].price - res[item].max_sale
                      : (res[item].price * (100 - res[item].sale)) / 100) *
                    res[item].amount;
                else
                  data[n].total +=
                    ((res[item].price * res[item].sale) / 100 >
                    res[item].max_sale
                      ? res[item].price - res[item].max_sale
                      : (res[item].price * (100 - res[item].sale)) / 100) *
                    res[item].total_amount;
              }
            }
            if (data[n].list_unit.length === 0) {
              data[n].list_unit.push({
                id_unit_ship: res[item].id_unit_ship,
                name_unit_ship: res[item].name_unit_ship,
                price_unit_ship: res[item].price_unit_ship,
              });
              data[n].price_ship = res[item].price_unit_ship;
              data[n].id_ship = res[item].id_unit_ship;
            } else {
              let numcheck = data[n].list_unit.filter(
                (item1) => res[item].id_unit_ship === item1.id_unit_ship
              ).length;
              if (numcheck === 0) {
                data[n].list_unit.push({
                  id_unit_ship: res[item].id_unit_ship,
                  name_unit_ship: res[item].name_unit_ship,
                  price_unit_ship: res[item].price_unit_ship,
                });
              }
            }
          }
          result(null, {
            status: true,
            data: data,
            id_order: id_order,
            id_user: res[0].id_user,
            listID: listID.join(","),
          });
        } else
          result(null, {
            status: true,
            data: [],
            id_order: "",
            id_user: "",
            listID: "",
          });
      }
    }
  );
};

Cart.getAllCartCust = (info, result) => {
  sql.query(
    "SELECT DISTINCT `id`, `amount`, `id_user`, `CODE`, `id_product`, `name_product`, if((`price`*sale/100)<max_sale,(`price`*(100-sale)/100), `price`-max_sale) as `price` , total_amount, `main_image`, `id_shop`, `name_shop` FROM `allcart` WHERE code = ?",
    [info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        if (res.length > 0)
          result(null, {
            status: true,
            data: res,
            id_user: res[0].id_user,
          });
        else
          result(null, {
            status: true,
            data: res,
            id_user: "",
          });
      }
    }
  );
};
Cart.changAmount = (info, result) => {
  sql.query(
    "UPDATE cart SET amount=IF('-'=?,IF(amount>1,amount-1,1),IF('+'=?,amount+1,amount)) WHERE id= ?",
    [info.value, info.value, info.id],
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
  console.log(info);

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
              amount: info.amount,
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
            `UPDATE cart SET amount =  amount+${info.amount} WHERE id=?`,
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
