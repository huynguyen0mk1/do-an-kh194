var shop = require("../models/shopModel");
var product = require("../models/productModel");
exports.getAllShop = (req, res) => {
  shop.getAllWithUser(req.body.info, (err, result) => {
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