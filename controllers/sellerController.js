"use strict";
var shop = require("../models/shopModel");
var category = require("../models/categoryModel");
var product = require("../models/productModel");
var unit = require("../models/unitShippingModel");
let transactionStatistics = require("../models/transactionStatisticsModel");
var order = require("../models/orderModel");
var voucher = require("../models/voucherModel");

exports.getAllShop = (req, res) => {
  shop.getAllWithUser(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAShop = (req, res) => {
  shop.getAllWithUserAndShop(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.newShop = (req, res) => {
  shop.getAllWithNameShop(
    { name: req.body.info.name },
    (err, resultNameShopAll) => {
      if (err) res.json({ data: { ...resultNameShopAll, content: "" } });
      else {
        if (resultNameShopAll.data.length > 0) {
          res.json({ data: { status: false, content: "name shop duplicate" } });
        } else
          shop.getAllWithUser(
            { code: req.body.info.id_user },
            (err, resultGetAll) => {
              if (err) res.json({ data: { ...resultGetAll, content: "" } });
              else {
                if (resultGetAll.data.length > 10) {
                  res.json({ data: { status: false, content: "max10" } });
                } else
                  shop.newShop(req.body.info, (err, result) => {
                    if (err) res.json({ data: { ...result, content: "" } });
                    else res.json({ data: { ...result, content: "" } });
                  });
              }
            }
          );
      }
    }
  );
};
exports.updateInfoShop = (req, res) => {
  shop.updateInfoShop(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getListCategoryShop = (req, res) => {
  category.getListCategoryShop(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.newProduct = (req, res) => {
  product.newProduct(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.updateProduct = (req, res) => {
  product.updateProduct(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.deleteProduct = (req, res) => {
  product.deleteProduct(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAllProductUser = (req, res) => {
  product.getAllProductUser(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAProductUser = (req, res) => {
  product.getAProductUser(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.newShippingUnit = (req, res) => {
  unit.newShippingUnit(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.listShippingUnit = (req, res) => {
  unit.listShippingUnit(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAShippingUnit = (req, res) => {
  unit.getAShippingUnit(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.updateShippingUnit = (req, res) => {
  unit.updateShippingUnit(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.deleteShippingUnit = (req, res) => {
  unit.deleteShippingUnit(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};

exports.getSellerWeek = (req, res) => {
  transactionStatistics.getSellerWeek(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getSellerMonth = (req, res) => {
  transactionStatistics.getSellerMonth(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getSellerOrder = (req, res) => {
  order.getSellerOrder(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getSellerUserOrder = (req, res) => {
  order.getSellerUserOrder(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getInforOrder = (req, res) => {
  order.getInforOrder(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getInfoDetailOrder = (req, res) => {
  order.getInfoDetailOrder(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.updateOrder = (req, res) => {
  order.updateOrder(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAVoucher = (req, res) => {
  voucher.getAVoucher(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getProductVoucher = (req, res) => {
  voucher.getProductVoucher(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.newVoucher = (req, res) => {
  voucher.newVoucher(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.updateVoucher = (req, res) => {
  voucher.updateVoucher(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.deleteVoucher = (req, res) => {
  voucher.deleteVoucher(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
