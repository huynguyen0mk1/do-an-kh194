"use strict";
var category = require("../models/categoryModel");
exports.getAllParentCategory = (req, res) => {
  category.getAllParent((err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
exports.getAllCategory = (req, res) => {
    category.getAllCategory((err, result) => {
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
};

exports.getListCategorys = (req, res) => {
  category.getListCategorys((err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};