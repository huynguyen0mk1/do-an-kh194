"use strict";
var login = require("../models/loginModel");
var shop = require("../models/shopModel");
exports.saveUser = (req, res) => {
  console.log(req.body.user);
  if (req.body.key === "111111111") {
    login.checkUser(req.body.user, (err, result) => {
      if (err) res.json({ data: { ...result, content: "" } });
      else {
        if (result.data.length > 0)
          res.json({
            data: { status: false, data: [], content: "duplicate email" },
          });
        else
          login.saveUser(req.body.user, (err1, resultA) => {
            if (err1) res.json({ data: { ...resultA, content: "" } });
            else res.json({ data: { ...resultA, content: "" } });
          });
      }
    });
  } else res.json({ data: { status: false, data: [], content: "" } });
};
exports.saveNewSeller = (req, res) => {
  console.log(req.body.user);
  console.log(req.body.shop);
  if (req.body.key === "111111111") {
    login.checkUser(req.body.user, (err, result) => {
      if (err) res.json({ data: result });
      else {
        if (result.data.length > 0)
          res.json({
            data: { status: false, data: [] },
          });
        else
          login.saveNewSeller(req.body.user, (err1, resultA) => {
            if (err1) res.json({ data: resultA });
            else {
              shop.newAShop(req.body.shop, (err1, resultShop) => {
                if (err1) res.json({ data: resultShop });
                else {
                  res.json({ data: resultA });
                }
              });
            }
          });
      }
    });
  } else res.json({ data: { status: false, data: [] } });
};
exports.getAllUser = (req, res) => {
  if (req.body.key === "111111111") {
    login.getAllUser((err, result) => {
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
  } else res.json({ data: { status: false, data: [] } });
};
exports.getUser = (req, res) => {
  if (req.body.key === "111111111") {
    console.log(req.body.user);
    login.checkUser(req.body.user, (err, result) => {
      if (err) res.json({ data: result, note: "User Name is Incorrect" });
      else {
        if (result.data.length !== 1)
          res.json({
            data: { status: false, data: [] },
            note: "User Name is Incorrect",
          });
        else {
          login.getUser(req.body.user, (errA, resultA) => {
            if (errA)
              res.json({
                status: false,

                data: resultA,
                note: "Password is Incorrect",
              });
            else
              res.json({
                data: resultA,
                note: "Password is Incorrect",
              });
          });
        }
      }
    });
  } else
    res.json({
      data: { status: false, data: {} },
      note: "User Name is Incorrect",
    });
};
exports.getRole = (req, res) => {
  //console.log(req.body.user);
  if (req.body.key === "111111111") {
    login.getRole(req.body.user, (err, result) => {
      if (err)
        res.json({
          data: result,

          note: "User is Incorrect",
        });
      else {
        if (result.data.length !== 1)
          res.json({
            data: { status: false, data: [] },
            note: "User is Incorrect",
          });
        else {
          res.json({
            data: { status: true, data: result.data[0] },
            note: "User is correct",
          });
        }
      }
    });
  } else
    res.json({
      data: { status: false, data: {} },
      note: "User Name is Incorrect",
    });
};
exports.updateInfoUser = (req, res) => {
  if (req.body.key === "111111111") {
    login.updateInfoUser(req.body.user, (err, result) => {
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
  } else res.json({ data: { status: false } });
};
exports.updateNumberPhoneUser = (req, res) => {
  if (req.body.key === "111111111") {
    login.updateNumberPhoneUser(req.body.user, (err, result) => {
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
  } else res.json({ data: { status: false } });
};
exports.updateEmailUser = (req, res) => {
  if (req.body.key === "111111111") {
    login.checkUser(req.body.user, (err, result) => {
      if (err) res.json({ data: result });
      else {
        if (result.data.length === 0)
          login.updateEmailUser(req.body.user, (err, resultEmailUser) => {
            if (err) res.json({ data: resultEmailUser });
            else res.json({ data: resultEmailUser });
          });
        else {
          res.json({
            data: { status: false },
          });
        }
      }
    });
  } else res.json({ data: { status: false } });
};
exports.updatePasswordUser = (req, res) => {
  if (req.body.key === "111111111") {
    login.updatePasswordUser(req.body.user, (err, result) => {
      console.log(req.body.user);
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
  } else res.json({ data: { status: false } });
};

exports.update_role = (req, res) => {
  if (req.body.key === "111111111") {
    login.update_role(req.body.user, (err, result) => {
      console.log(req.body.user);
      if (err) res.json({ data: result });
      else res.json({ data: result });
    });
  } else res.json({ data: { status: false } });
};
