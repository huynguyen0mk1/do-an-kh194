"use strict";
var cart = require("../models/cartModel");
var product = require("../models/productModel");
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
