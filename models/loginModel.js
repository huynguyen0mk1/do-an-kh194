"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Login = function (login) {
  this.username = login.username;
};
Login.saveUser = (user, result) => {
  {
    sql.query("INSERT INTO Users  set ?", user, (err, res) => {
      if (err) {
        console.log(user);
        result(err, { status: false, Message: err.sqlMessage });
      } else {
        sql.query(
          "INSERT INTO users_role  set ?",
          { id_user: user.id, id_role: "role-002" },
          (err, res) => {
            if (err) {
              result(err, { status: false, Message: err.sqlMessage });
            } else {
              result(null, { status: true });
            }
          }
        );
      }
    });
  }
};
Login.getUser = (user, result) => {
  {
    sql.query(
      "SELECT DISTINCT u.`id`, u.`email`, u.`first_name`, u.`last_name`, u.`password`, u.`avatar`, r.name as 'role', u.code FROM `users`u INNER JOIN users_role ur ON ur.id_user = u.id INNER JOIN roles r on r.id = ur.id_role WHERE u.email = ? and u.password = ?",
      [user.email, user.password],
      (err, res) => {
        if (err) {
          //console.log("error: ", err);
          result(err, { status: false, Message: err.sqlMessage, data: [] });
        } else {
          result(null, { status: true, data: res[0] });
        }
      }
    );
  }
};
Login.getRole = (user, result) => {
  {
    sql.query(
      "SELECT DISTINCT u.`id`, u.`email`, u.`first_name`, u.`last_name`, u.`password`, u.`avatar`, r.name as 'role', u.code FROM `users`u INNER JOIN users_role ur ON ur.id_user = u.id INNER JOIN roles r on r.id = ur.id_role WHERE u.code = ?",
      [user.code],
      (err, res) => {
        if (err) {
          //console.log("error: ", err);
          result(err, { status: false, Message: err.sqlMessage, data: [] });
        } else {
          result(null, { status: true, data: res });
        }
      }
    );
  }
};
Login.checkUser = (user, result) => {
  {
    sql.query(
      "SELECT DISTINCT  id, email, password  FROM `Users` u WHERE u.email = ? and u.password = ?",
      [user.email, user.password],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false, Message: err.sqlMessage, data: [] });
        } else {
          if (res.length == 1)
            sql.query(
              "UPDATE `users` SET `code`= ? WHERE email = ? and password = ?",
              [
                md5(
                  new Date()
                    .getTime()
                    .toString()
                    .concat("===")
                    .concat(res[0].id)
                    .concat("===")
                    .concat(user.email)
                    .concat("===")
                    .concat(user.password)
                ),
                user.email,
                user.password,
              ],
              (err, res) => {}
            );
          result(null, { status: true, data: res });
        }
      }
    );
  }
};

Login.getAllUser = (result) => {
  {
    sql.query(
      "SELECT DISTINCT  idUser as `id`, userName, password, role  FROM `Users`",
      (err, res) => {
        if (err) {
          //console.log("error: ", err);
          result(err, { status: false, Message: err.sqlMessage, data: err });
        } else {
          result(null, { status: true, data: res });
        }
      }
    );
  }
};
Login.getIdUser = (code, data) => {
  {
    sql.query(
      "SELECT DISTINCT id FROM users WHERE code =?",
      [code],
      (err, res) => {
        if (err) {
          //console.log("error: ", err);
          data(err, { status: false, Message: err.sqlMessage });
        } else {
          data(null, { status: true, data: res[0] });
        }
      }
    );
  }
};
module.exports = Login;
