"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var Login = function (login) {
  this.username = login.username;
};
Login.saveUser = (user, result) => {
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
};
Login.saveNewSeller = (user, result) => {
  {
    let code = md5(
      new Date()
        .getTime()
        .toString()
        .concat("===")
        .concat(user.id)
        .concat("===")
        .concat(user.email)
        .concat("===")
        .concat(user.password)
    );
    sql.query(
      "INSERT INTO Users  set ?",
      {
        ...user,
        code: code,
      },
      (err, res) => {
        if (err) {
          console.log(user);
          result(err, { status: false, Message: err.sqlMessage });
        } else {
          sql.query(
            "INSERT INTO users_role  set ?",
            { id_user: user.id, id_role: "role-003" },
            (err, res) => {
              if (err) {
                result(err, { status: false, Message: err.sqlMessage });
              } else {
                result(null, { status: true, code: code });
              }
            }
          );
        }
      }
    );
  }
};
Login.getUser = (user, result) => {
  sql.query(
    "SELECT `id`, `email`, `first_name`, `last_name`, `birthday`, `number_phone`, `full_name`, `password`, `avatar`, `role`, `code`,gender FROM `info_user` WHERE email = ? and password = ?",
    [user.email, user.password],
    (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        console.log(res[0]);
        result(null, { status: true, data: res[0] });
      }
    }
  );
};
Login.getRole = (user, result) => {
  {
    sql.query(
      "SELECT `id`, `email`, `first_name`, `last_name`, `birthday`, `number_phone`, `full_name`, `password`, `avatar`, `role`, `code`,gender FROM `info_user` WHERE code = ?",
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
      "SELECT DISTINCT  id, email, password  FROM `Users` u WHERE u.email = ? ",
      [user.email],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, { status: false, Message: err.sqlMessage, data: [] });
        } else {
          if (res.length == 1)
            sql.query(
              "UPDATE `users` SET `code`= ? WHERE email = ? ",
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
              ],
              (err, resA) => {}
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
          result(err, {
            status: false,
            Message: err.sqlMessage,
            data: err,
          });
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

Login.updateInfoUser = (user, result) => {
  {
    sql.query(
      "UPDATE users SET first_name=?,last_name=? ,avatar=?,birthday=? ,gender=? WHERE id=?",
      [
        user.first_name,
        user.last_name,
        user.avatar,
        user.birthday,
        user.gender,
        user.id,
      ],
      (err, res) => {
        if (err) {
          result(err, { status: false, Message: err.sqlMessage });
        } else {
          result(null, { status: true });
        }
      }
    );
  }
};

Login.updateNumberPhoneUser = (user, result) => {
  {
    sql.query(
      "UPDATE users SET number_phone=? WHERE id=?",
      [user.number_phone, user.id],
      (err, res) => {
        if (err) {
          result(err, { status: false, Message: err.sqlMessage });
        } else {
          result(null, { status: true });
        }
      }
    );
  }
};
Login.updateEmailUser = (user, result) => {
  {
    sql.query(
      "UPDATE users SET email=? WHERE id=?",
      [user.email, user.id],
      (err, res) => {
        if (err) {
          result(err, { status: false, Message: err.sqlMessage });
        } else {
          result(null, { status: true });
        }
      }
    );
  }
};
Login.updatePasswordUser = (user, result) => {
  {
    console.log(user);

    sql.query(
      "UPDATE users SET password=? WHERE id=?",
      [user.password, user.id],
      (err, res) => {
        if (err) {
          result(err, { status: false, Message: err.sqlMessage });
        } else {
          result(null, { status: true });
        }
      }
    );
  }
};

module.exports = Login;
