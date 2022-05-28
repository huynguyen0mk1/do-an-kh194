"use strict";
var sql = require("./db.js");
exports.send_mail = (info_email, res) => {
  sql.query(
    "SELECT `id`, `key_1`, `key_2`, `value_1`, `value_2`, `description` FROM `tbl_common` WHERE key_1 = 'send_email' ORDER BY id ASC",
    (err, res) => {
      if (err) {
        console.log(err, "send_mail " + info_email.subject, {
          status: false,
          line: 8,
        });
      } else {
        console.log(res);
        if (res.length === 2) {
          const nodemailer = require("nodemailer");

          const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
              user: res[0].value_2,
              pass: res[1].value_2,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          const mailOptions = {
            from: `"ShopStar" <${res[0].value_2}>`,
            to: info_email.email,
            subject: info_email.subject,
            template: 'email',
            text: info_email.subject,
            html: info_email.html,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            }
            console.log('Email sent: ' + info.response);
          });
        } else
          console.log("send_mail " + info.subject, { status: false, line: 34 });
      }
    }
  );
};
