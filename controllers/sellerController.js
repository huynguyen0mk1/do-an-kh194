"use strict";
var shop = require("../models/shopModel");

exports.getAllShop = (req, res) => {
  shop.getAllWithUser(req.body.info, (err, result) => {
    if (err) res.json({ data: result });
    else res.json({ data: result });
  });
};
