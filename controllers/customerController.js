"use strict";
let cart = require("../models/cartModel");
let product = require("../models/productModel");
let orderDetail = require("../models/OrderDetailModel");
let order = require("../models/orderModel");
let address = require("../models/addressModel");
exports.changeCart = (req, res) => {
  cart.changeCart(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.deleteCart = (req, res) => {
  cart.deleteCart(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.deleteACart = (req, res) => {
  cart.deleteACart(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAllCart = (req, res) => {
  cart.getAllCart(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAllCartUser = (req, res) => {
  cart.getAllCartUser(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.changAmount = (req, res) => {
  cart.changAmount(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};

exports.getAllProductCategory = (req, res) => {
  product.getAllProductCategory(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAllProductCustomer = (req, res) => {
  product.getAllProductCustomer(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAProduct = (req, res) => {
  product.getAProduct(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.createPayment = (req, res) => {
  if (req.body.new_billing_address === true) {
    address.newAddress(req.body.billing_address, req.body.list_address, (err, resultNewAddress) => {});
  }
  order.newOrder(req.body.list_order, (err, resultNewOrder) => {
    if (resultNewOrder.status === true) {
      orderDetail.newOrderDetail(
        req.body.list_order_detail,
        (err, resultNewOrderDetail) => {
          if (resultNewOrderDetail.status === true) {
            if (req.body.payment_method === "bacs") {
              let ipAddr =
                req.headers["x-forwarded-for"] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

              let dateFormat = require("dateformat");

              let tmnCode = process.env.vnp_TmnCode;
              let secretKey = process.env.vnp_HashSecret;
              let vnpUrl = process.env.vnp_Url;
              let returnUrl = process.env.vnp_ReturnUrl;

              let date = new Date();

              let createDate = dateFormat(date, "yyyymmddHHmmss");
              let orderId = req.body.info.orderId;
              let amount = req.body.info.amount;
              let bankCode = req.body.info.bankCode;

              let orderInfo = req.body.info.orderDescription;
              let orderType = req.body.info.orderType;
              let locale = req.body.info.language;
              if (locale === null || locale === "") {
                locale = "vn";
              }
              let currCode = "VND";
              let vnp_Params = {};
              vnp_Params["vnp_Version"] = "2.0.0";
              vnp_Params["vnp_Command"] = "pay";
              vnp_Params["vnp_TmnCode"] = tmnCode;
              vnp_Params["vnp_Locale"] = locale;
              vnp_Params["vnp_CurrCode"] = currCode;
              vnp_Params["vnp_TxnRef"] = orderId;
              vnp_Params["vnp_OrderInfo"] = orderInfo;
              vnp_Params["vnp_OrderType"] = orderType;
              vnp_Params["vnp_Amount"] = amount * 100;
              vnp_Params["vnp_ReturnUrl"] = returnUrl;
              vnp_Params["vnp_IpAddr"] = ipAddr;
              vnp_Params["vnp_CreateDate"] = createDate;
              let hashdata = "";
              if (bankCode !== null && bankCode !== "") {
                vnp_Params["vnp_BankCode"] = bankCode;
                hashdata =
                  `vnp_Amount=${vnp_Params.vnp_Amount}&vnp_BankCode=${vnp_Params.vnp_BankCode}&vnp_Command=${vnp_Params.vnp_Command}` +
                  `&vnp_CreateDate=${vnp_Params.vnp_CreateDate}&vnp_CurrCode=${vnp_Params.vnp_CurrCode}&vnp_IpAddr=${vnp_Params.vnp_IpAddr}` +
                  `&vnp_Locale=${vnp_Params.vnp_Locale}&vnp_OrderInfo=${vnp_Params.vnp_OrderInfo}&vnp_OrderType=${vnp_Params.vnp_OrderType}` +
                  `&vnp_ReturnUrl=${vnp_Params.vnp_ReturnUrl}&vnp_TmnCode=${vnp_Params.vnp_TmnCode}&vnp_TxnRef=${vnp_Params.vnp_TxnRef}` +
                  `&vnp_Version=${vnp_Params.vnp_Version}`;
              } else
                hashdata =
                  `vnp_Amount=${vnp_Params.vnp_Amount}&vnp_Command=${vnp_Params.vnp_Command}` +
                  `&vnp_CreateDate=${vnp_Params.vnp_CreateDate}&vnp_CurrCode=${vnp_Params.vnp_CurrCode}&vnp_IpAddr=${vnp_Params.vnp_IpAddr}` +
                  `&vnp_Locale=${vnp_Params.vnp_Locale}&vnp_OrderInfo=${vnp_Params.vnp_OrderInfo}&vnp_OrderType=${vnp_Params.vnp_OrderType}` +
                  `&vnp_ReturnUrl=${vnp_Params.vnp_ReturnUrl}&vnp_TmnCode=${vnp_Params.vnp_TmnCode}&vnp_TxnRef=${vnp_Params.vnp_TxnRef}` +
                  `&vnp_Version=${vnp_Params.vnp_Version}`;

              vnp_Params = sortObject(vnp_Params);

              let querystring = require("qs");
              let hash = require("hash.js");
              let signed = hash
                .sha256()
                .update(secretKey + hashdata)
                .digest("hex");
              vnp_Params["vnp_SecureHash"] = signed;
              vnpUrl +=
                "?" + querystring.stringify(vnp_Params, { encode: false });
              res.json({
                status: true,
                data: vnpUrl,
                payment_method: "bacs",
              });
            } else
              cart.deleteAllCartOfUser(
                req.body.id_user,
                (err, resultDeleteAllCartOfUser) => {
                  if (resultDeleteAllCartOfUser.status === true) {
                    res.json({
                      status: true,
                      data: "No Links",
                      payment_method: "cod",
                    });
                  } else {
                    res.json({
                      status: true,
                      data: "No Links",
                      payment_method: "cod",
                    });
                  }
                }
              );
          } else {
            res.json({
              status: false,
              data: "No Links",
              payment_method: "No Method",
            });
          }
        }
      );
    } else {
      res.json({
        status: true,
        data: "No Links",
        payment_method: "cod",
      });
    }
  });
};
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
exports.paymentReturn = (req, res) => {
  let vnp_Params = req.body.info;
  let secureHash = vnp_Params["vnp_SecureHash"];
  let secretKey = process.env.vnp_HashSecret;

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  let querystring = require("qs");
  let hashdata = querystring.stringify(vnp_Params, { encode: false });

  let hash = require("hash.js");
  let signed = hash
    .sha256()
    .update(secretKey + hashdata)
    .digest("hex");
  if (signed === secureHash) {
    if (vnp_Params["vnp_ResponseCode"] === "00") {
      cart.deleteAllCartOfUserWithCode(req.body.code, (err, result) => {
        if (err) res.json({ status: false });
        else {
          order.updateOrder(
            { id: req.body.id_order, status: "đã thanh toán" },
            (err, resultUpdateOrde) => {}
          );
          res.json({ status: true });
        }
      });
    } else {
      orderDetail.deleteOrderDetail(
        req.body.id_order,
        (err, resultDeleteOrderDetail) => {
          if (resultDeleteOrderDetail.status === true) {
            order.deleteOrder(
              req.body.id_order,
              (err, resultDeleteOrder) => {}
            );
          }
        }
      );
      res.json({ status: false });
    }
  } else {
    orderDetail.deleteOrderDetail(
      req.body.id_order,
      (err, resultDeleteOrderDetail) => {
        if (resultDeleteOrderDetail.status === true) {
          order.deleteOrder(req.body.id_order, (err, resultDeleteOrder) => {});
        }
      }
    );
    res.json({ status: false });
  }
};