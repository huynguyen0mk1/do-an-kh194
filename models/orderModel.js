"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Order = function (order) {
  this.id = order.id;
};

Order.newOrder = (info, result) => {
  for (let i in info) {
    sql.query("INSERT INTO orders set ?", info[i], (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      }
    });
  }
  result(null, { status: true });
};
Order.deleteOrder = (info, result) => {
  sql.query(
    "DELETE FROM `orders` WHERE `id` LIKE  ?",
    info.concat("%"),
    (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      } else result(null, { status: true });
    }
  );
};
Order.updateOrder = (info, result) => {
  sql.query(
    "UPDATE `orders` SET `status`=? WHERE `id` LIKE  ?",
    [info.status, info.id.concat("%")],
    (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      } else result(null, { status: true });
    }
  );
};

Order.getDTOfSellerOnWEEK = (info, result) => {
  sql.query(
    "UPDATE `orders` SET `status`=? WHERE `id` LIKE  ?",
    [info.status, info.id.concat("%")],
    (err, res) => {
      if (err) {
        console.log(err.sqlMessage);
        result(err, { status: false, Message: err.sqlMessage });
      } else result(null, { status: true });
    }
  );
};

Order.getSellerOrder = (info, result) => {
  sql.query(
    "SELECT `id`, `create_date`,  `name_shop`,code_shipping,  `name_category`,  `total`,  `status`, `status_ship`, `name_ship` FROM `allorder` WHERE `code` = ?  ORDER BY create_date DESC",
    [info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};

Order.getCustomerOrder = (info, result) => {
  sql.query(
    `SELECT id, create_date, code_user, CODE, id_product, status, status_ship, name_seller, order_info, order_detail FROM view_list_order_cust WHERE code_user = ? ${info.where}  ORDER BY create_date DESC`,
    [info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        if (res.length > 0) {
          let data = [];
          for (let i in res) {
            if (data.length === 0) {
              data.push({
                ...res[i],
                order_info: JSON.parse(res[i].order_info),
                order_detail: [JSON.parse(res[i].order_detail)],
                status_order:
                  res[i].status_ship.toLowerCase() ===
                    "đặt hàng".toLowerCase() ||
                  res[i].status_ship.toLowerCase() ===
                    "chuẩn bị hàng".toLowerCase()
                    ? "Đang xử lý"
                    : res[i].status_ship.toLowerCase() ===
                      "Đã Giao Đơn Hàng Cho Đơn Vị Vận Chuyển".toLowerCase()
                    ? "Đang vận chuyển"
                    : res[i].status_ship.toLowerCase() ===
                      "Đã giao".toLowerCase()
                    ? "Đã Giao Đơn Hàng"
                    : res[i].status_ship.toLowerCase() ===
                      "Đơn Hoàn Về".toLowerCase()
                    ? "Đã huỷ"
                    : "none",
                status:
                  res[i].status.toLowerCase() ===
                  "Chưa Thanh Toán".toLowerCase()
                    ? "Chờ thanh toán"
                    : res[i].status.toLowerCase() ===
                      "Đã Thanh Toán".toLowerCase()
                    ? "Đã Thanh Toán"
                    : "Hoàn Tiền",
              });
            } else {
              let numcheck = data.filter(
                (item1) => res[i].id === item1.id
              ).length;
              if (numcheck === 0) {
                data.push({
                  ...res[i],
                  order_info: JSON.parse(res[i].order_info),
                  order_detail: [JSON.parse(res[i].order_detail)],
                  status:
                    res[i].status.toLowerCase() ===
                    "Chưa Thanh Toán".toLowerCase()
                      ? "Chờ thanh toán"
                      : res[i].status.toLowerCase() ===
                        "Đã Thanh Toán".toLowerCase()
                      ? "Đã Thanh Toán"
                      : "Hoàn Tiền",
                  status_order:
                    res[i].status_ship.toLowerCase() ===
                      "đặt hàng".toLowerCase() ||
                    res[i].status_ship.toLowerCase() ===
                      "chuẩn bị hàng".toLowerCase()
                      ? "Đang xử lý"
                      : res[i].status_ship.toLowerCase() ===
                        "Đã Giao Đơn Hàng Cho Đơn Vị Vận Chuyển".toLowerCase()
                      ? "Đang vận chuyển"
                      : res[i].status_ship.toLowerCase() ===
                        "Đã giao".toLowerCase()
                      ? "Đã Giao Đơn Hàng"
                      : res[i].status_ship.toLowerCase() ===
                        "Đơn Hoàn Về".toLowerCase()
                      ? "Đã huỷ"
                      : "none",
                });
                i++;
              } else {
                for (let j in data) {
                  if (data[j].id === res[i].id)
                    data[j].order_detail.push(JSON.parse(res[i].order_detail));
                }
              }
            }
          }
          result(null, { status: true, data: data });
        }
      }
    }
  );
};

Order.getInforOrder = (info, result) => {
  sql.query(
    "SELECT DISTINCT id, create_date, id_shipping, name_unit_ship, price_unit_ship, address_shipping, full_name_cust, number_phone, email, address, city, id_user, id_shop, name_shop, total, status, status_ship, code_shipping, payment_method, note, percent, max_value FROM infoorder WHERE id = ?",
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
Order.getInfoDetailOrder = (info, result) => {
  sql.query(
    "SELECT id, amount, id_product, name_product, id_order, subtotal, price, main_image FROM allinfodetailorder WHERE id_order = ?",
    [info.id_order],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        result(null, { status: true, data: res });
      }
    }
  );
};
Order.updateOrder = (info, result) => {
  sql.query(
    "UPDATE orders SET status=?,status_ship=?,code_shipping=? WHERE id= ?",
    [info.status, info.status_ship, info.code_shipping, info.id],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage });
      } else {
        result(null, { status: true });
      }
    }
  );
};

module.exports = Order;
