"use strict";
var shop = require("../models/shopModel");
var category = require("../models/categoryModel");
var product = require("../models/productModel");
var unit = require("../models/unitShippingModel");

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
  shop.newShop(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
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