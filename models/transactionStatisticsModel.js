"user strict";
const md5 = require("md5");
var sql = require("./db.js");
var TransactionStatistics = function (transactionStatistics) {
  this.id = transactionStatistics.id;
};
TransactionStatistics.getSellerWeek = (info, result) => {
  sql.query(
    "SELECT `create_date`, `id_shop`, `name_shop`, `id_category`, `name_category`, `percent`, `max_value`, IF(total*percent/100<max_value, round(total *((100 - percent) / 100)), round(`total`-max_value)) AS total, `CODE`, `name_seller`, `STATUS`, `status_ship` FROM `transaction_statistics_week` WHERE  code = ?",
    [info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        let labels = [];
        let shop = [];
        for (let i in res) {
          if (labels.length === 0) {
            labels.push(res[i].create_date);
          } else {
            let numcheck = labels.filter(
              (item1) => res[i].create_date === item1
            ).length;
            if (numcheck === 0) {
              labels.push(res[i].create_date);
            }
          }
          if (shop.length === 0) {
            shop.push({
              id_shop: res[i].id_shop,
              name_shop: res[i].name_shop,
            });
          } else {
            let numcheck = shop.filter(
              (item1) => res[i].id_shop === item1.id_shop
            ).length;
            if (numcheck === 0) {
              shop.push({
                id_shop: res[i].id_shop,
                name_shop: res[i].name_shop,
              });
            }
          }
        }
        let datasets = [];
        for (let i in shop) {
          let color = generateRandomColor();
          datasets.push({
            label: shop[i].name_shop,
            backgroundColor: color,
            hoverBackgroundColor: "#175000",
            borderColor: color,
            borderWidth: 2,
            data: [],
          });
          let row = res
            .filter((item) => item.id_shop === shop[i].id_shop)
            .map((item) => {
              return { create_date: item.create_date, total: item.total };
            });
          for (let j in labels) {
            let temp = row.filter((item) => item.create_date === labels[j]);
            datasets[i].data[j] = temp.length > 0 ? temp[0].total : 0;
          }
        }

        result(null, {
          status: true,
          data: {
            labels: labels,
            datasets: datasets,
          },
        });
      }
    }
  );
};
TransactionStatistics.getSellerMonth = (info, result) => {
  sql.query(
    "SELECT `create_date`, `id_shop`, `name_shop`, `id_category`, `name_category`, `percent`, `max_value`, IF(SUM(total)*percent/100<max_value,SUM(`total`) *((100 - percent) / 100),SUM(`total`)-max_value) AS total, `CODE`, `name_seller`, `STATUS`, `status_ship` FROM `transaction_statistics_month` WHERE code = ? GROUP BY `create_date`, `id_shop`, `name_shop`, `id_category`, `name_category`, `percent`, `max_value`, `CODE`, `name_seller`, `STATUS`, `status_ship`",
    [info.code],
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        let labels = [];
        let shop = [];
        for (let i in res) {
          if (labels.length === 0) {
            labels.push(res[i].create_date);
          } else {
            let numcheck = labels.filter(
              (item1) => res[i].create_date === item1
            ).length;
            if (numcheck === 0) {
              labels.push(res[i].create_date);
            }
          }
          if (shop.length === 0) {
            shop.push({
              id_shop: res[i].id_shop,
              name_shop: res[i].name_shop,
            });
          } else {
            let numcheck = shop.filter(
              (item1) => res[i].id_shop === item1.id_shop
            ).length;
            if (numcheck === 0) {
              shop.push({
                id_shop: res[i].id_shop,
                name_shop: res[i].name_shop,
              });
            }
          }
        }
        let datasets = [];
        for (let i in shop) {
          datasets.push({
            label: shop[i].name_shop,
            backgroundColor: generateRandomColor(),
            hoverBackgroundColor: "#175000",
            borderColor: "rgba(0,256,256,1)",
            borderWidth: 2,
            data: [],
          });
          let row = res
            .filter((item) => item.id_shop === shop[i].id_shop)
            .map((item) => {
              return { create_date: item.create_date, total: item.total };
            });
          for (let j in labels) {
            let temp = row.filter((item) => item.create_date === labels[j]);
            console.log(temp);
            datasets[i].data[j] = temp.length > 0 ? temp[0].total : 0;
          }
          console.log(datasets[i].data);
        }

        result(null, {
          status: true,
          data: {
            labels: labels,
            datasets: datasets,
          },
        });
      }
    }
  );
};

//admin
TransactionStatistics.getAdminWeek = (result) => {
  sql.query(
    "SELECT `create_date`, `total` FROM `transactionstatistics_admin_week`",
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        let color = generateRandomColor();
        let labels = [];
        for (let i in res) {
          if (labels.length === 0) {
            labels.push(res[i].create_date);
          } else {
            let numcheck = labels.filter(
              (item1) => res[i].create_date === item1
            ).length;
            if (numcheck === 0) {
              labels.push(res[i].create_date);
            }
          }
        }

        let datasets = {
          label: "",
          backgroundColor: color,
          hoverBackgroundColor: "#175000",
          borderColor: color,
          borderWidth: 2,
          data: [],
        };
        for (let j in labels) {
          let temp = res.filter((item) => item.create_date === labels[j]);
          console.log(temp);
          datasets.data[j] = temp.length > 0 ? temp[0].total : 0;
        }
        result(null, {
          status: true,
          data: {
            labels: labels,
            datasets: [datasets],
          },
        });
      }
    }
  );
};
TransactionStatistics.getAdminMonth = (result) => {
  sql.query(
    "SELECT `create_date`, sum(`total`) as total FROM `transactionstatistics_admin_month` GROUP BY create_date",
    (err, res) => {
      if (err) {
        result(err, { status: false, Message: err.sqlMessage, data: [] });
      } else {
        let color = generateRandomColor();
        let labels = [];
        for (let i in res) {
          if (labels.length === 0) {
            labels.push(res[i].create_date);
          } else {
            let numcheck = labels.filter(
              (item1) => res[i].create_date === item1
            ).length;
            if (numcheck === 0) {
              labels.push(res[i].create_date);
            }
          }
        }

        let datasets = {
          label: "",
          backgroundColor: color,
          hoverBackgroundColor: "#175000",
          borderColor: color,
          borderWidth: 2,
          data: [],
        };
        for (let j in labels) {
          let temp = res.filter((item) => item.create_date === labels[j]);
          console.log(temp);
          datasets.data[j] = temp.length > 0 ? temp[0].total : 0;
        }
        result(null, {
          status: true,
          data: {
            labels: labels,
            datasets: [datasets],
          },
        });
      }
    }
  );
};
function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}
module.exports = TransactionStatistics;
