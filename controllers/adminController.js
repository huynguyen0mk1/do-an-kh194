var shop = require("../models/shopModel");
var product = require("../models/productModel");
var category = require("../models/categoryModel");
var transactionStatistics = require("../models/transactionStatisticsModel");
exports.getAllShop = (req, res) => {
  shop.getAllShop(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAllProduct = (req, res) => {
  product.getAllProduct(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAdminMonth = (req, res) => {
  transactionStatistics.getAdminMonth((err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAdminWeek = (req, res) => {
  transactionStatistics.getAdminWeek((err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.updateStatusProduct = (req, res) => {
  product.updateStatusProduct(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.updateStatusShop = (req, res) => {
  shop.updateStatusShop(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.newCategory = (req, res) => {
  category.newCategory(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.updateCategory = (req, res) => {
  category.updateCategory(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getACategory = (req, res) => {
  category.getACategory(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.deleteCategory = (req, res) => {
  category.deleteCategory(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
