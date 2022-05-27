"use strict";
var sql = require("./db.js");
exports.send_mail = (info, result) => {
  sql.query(
    "SELECT `id`, `key_1`, `key_2`, `value_1`, `value_2`, `description` FROM `tbl_common` WHERE key_1 = 'send_email' ORDER BY id ASC",
    (err, res) => {
      if (err) {
        result(err, { status: false });
      } else {
        if (res.length === 2) {
          const nodemailer = require("nodemailer");
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: res[0].value_2,
              pass: res[1].value_2,
            },
          });

          const mailOptions = {
            from: res[0].value_2,
            to: info.email,
            subject: info.subject,
            html: info.html,
          };
          transporter.sendMail(mailOptions, function (error, data) {
            if (error) {
              result(null, { status: false });
            } else {
              result(null, { status: true });
            }
          });
          result(null, { status: true });
        } else result(null, { status: false });
      }
    }
  );
};
