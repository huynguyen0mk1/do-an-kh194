"use strict";
var sql = require("./db.js");
exports.send_mail = (info) => {
  sql.query(
    "SELECT `id`, `key_1`, `key_2`, `value_1`, `value_2`, `description` FROM `tbl_common` WHERE key_1 = 'send_email' ORDER BY id ASC",
    (err, res) => {
      if (err) {
        console.log(err, "send_mail " + info.subject, {
          status: false,
          line: 8,
        });
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
              console.log("send_mail " + info.subject, {
                status: false,
                line: 28,
              });
            } else {
              console.log("send_mail " + info.subject, {
                status: true,
                line: 30,
              });
            }
          });
        } else
          console.log("send_mail " + info.subject, { status: false, line: 34 });
      }
    }
  );
};
