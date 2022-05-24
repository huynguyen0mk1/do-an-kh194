("use strict");
const jwt = require("jsonwebtoken");
module.exports = function (app) {
  var login = require("../controllers/loginController");
  var seller = require("../controllers/sellerController");
  var public = require("../controllers/publicController");
  var admin = require("../controllers/adminController");
  var customer = require("../controllers/customerController");

  //public
  app.get("/getAllParentCategory", public.getAllParentCategory);
  app.get("/getAllCategory", public.getAllCategory);
  app.get("/getListCategorys", public.getListCategorys);

  //account
  app.post("/login/taikhoan/:date/:code", login.getUser);
  app.post("/dangkitaikhoan", login.saveUser);
  app.post("/cap_nhat_tai_khoan", login.updateInfoUser);
  app.post("/cap_nhat_tai_khoan/so_dien_thoai", login.updateNumberPhoneUser);
  app.post("/cap_nhat_tai_khoan/email", login.updateEmailUser);
  app.post("/cap_nhat_tai_khoan/password", login.updatePasswordUser);

  app.post("/dangkitaikhoanseller", login.saveNewSeller);
  app.post("/getRole", login.getRole);

  //seller
  app.post("/seller/getALLShop", seller.getAllShop);
  app.post("/seller/getAShop", seller.getAShop);
  app.post("/seller/newShop", seller.newShop);
  app.post("/seller/updateShop", seller.updateInfoShop);
  app.post("/seller/getListCategoryShop", seller.getListCategoryShop);
  app.post("/seller/newProduct", seller.newProduct);
  app.post("/seller/getAllProductUser", seller.getAllProductUser);
  app.post("/seller/updateProduct", seller.updateProduct);
  app.post("/seller/getAProductUser", seller.getAProductUser);
  app.post("/seller/deleteProduct", seller.deleteProduct);
  app.post("/seller/newShippingUnit", seller.newShippingUnit);
  app.post("/seller/listShippingUnit", seller.listShippingUnit);
  app.post("/seller/getAShippingUnit", seller.getAShippingUnit);
  app.post("/seller/updateShippingUnit", seller.updateShippingUnit);
  app.post("/seller/deleteShippingUnit", seller.deleteShippingUnit);

  app.post("/seller/getSellerWeek", seller.getSellerWeek);
  app.post("/seller/getSellerMonth", seller.getSellerMonth);
  app.post("/seller/getSellerOrder", seller.getSellerOrder);

  app.post("/seller/getInforOrder", seller.getInforOrder);
  app.post("/seller/getInfoDetailOrder", seller.getInfoDetailOrder);
  app.post("/seller/updateOrder", seller.updateOrder);

  app.post("/seller/getAVoucher", seller.getAVoucher);
  app.post("/seller/getProductVoucher", seller.getProductVoucher);
  app.post("/seller/updateVoucher", seller.updateVoucher);
  app.post("/seller/deleteVoucher", seller.deleteVoucher);
  app.post("/seller/newVoucher", seller.newVoucher);
  //admin
  app.post("/admin/getAllProduct", admin.getAllProduct);
  app.post("/admin/getALLShop", admin.getAllShop);
  app.post("/admin/newCategory", admin.newCategory);
  app.post("/admin/updateCategory", admin.updateCategory);
  app.post("/admin/getACategory", admin.getACategory);
  app.post("/admin/deleteCategory", admin.deleteCategory);
  app.post("/admin/updateStatusShop", admin.updateStatusShop);
  app.post("/admin/updateStatusProduct", admin.updateStatusProduct);
  // customer
  app.post("/customer/changeCart", customer.changeCart);
  app.post("/customer/getAllProductCategory", customer.getAllProductCategory);
  app.post("/customer/getResultSearch", customer.getResultSearch);
  app.post("/customer/getAllProductCustomer", customer.getAllProductCustomer);
  app.post("/customer/getAProduct", customer.getAProduct);
  app.post("/customer/getAllCart", customer.getAllCart);
  app.post("/customer/getAllCartCust", customer.getAllCartCust);
  app.post("/customer/getAllCartUser", customer.getAllCartUser);
  app.post("/customer/changAmount", customer.changAmount);
  app.post("/customer/getCustomerOrder", customer.getCustomerOrder);
  app.post("/customer/getAShop", customer.getAShop);
  app.post("/customer/getAllProductInShop", customer.getAllProductInShop);
  app.post("/customer/deleteACart", customer.deleteACart);
  app.post("/customer/createPayment", customer.createPayment);
  app.post("/customer/paymentReturn", customer.paymentReturn);
  app.post(
    "/customer/getAVoucherWithCodeInListId",
    customer.getAVoucherWithCodeInListId
  );
  app.post("/customer/getAllCategoryHot", customer.getAllCategoryHot);
  app.post("/customer/newUseVoucher", customer.newUseVoucher);
  app.post("/customer/getUseVoucher", customer.getUseVoucher);
  app.get("/getAllUser", login.getAllUser);
  app.get("/getAudio/:num", (req, res) => {
    let fileName = req.params.num;
    const path = require("path");
    const pathFile = path.resolve(`./public/audio/${fileName}`);
    sendfile(fileName, pathFile, res);
  });
  app.get("/getImage/:fileName", (req, res) => {
    let fileName = req.params.fileName;
    const path = require("path");
    const pathFile = path.resolve(`./public/images/${fileName}`);
    sendfile(fileName, pathFile, res);
  });
  app.get("/getCss/:fileName", (req, res) => {
    let fileName = req.params.fileName;
    const path = require("path");
    const pathFile = path.resolve(`./public/css/${fileName}`);
    sendfile(fileName, pathFile, res);
  });
  app.get("/getJs/:fileName", (req, res) => {
    let fileName = req.params.fileName;
    const path = require("path");
    const pathFile = path.resolve(`./public/js/${fileName}`);
    sendfile(fileName, pathFile, res);
  });
  app.get("/getFile/:fileName", (req, res) => {
    let fileName = req.params.fileName;
    const path = require("path");
    const pathFile = path.resolve(
      `./public/${fileName.split(".")[1]}/${fileName}`
    );
    sendfile(fileName, pathFile, res);
  });
  app.post("/uploadFile", (req, res) => {
    //console.log(req.files);
    if (req.files === null || req.files === undefined) {
      res.json({ status: "error" });
    } else {
      let file = req.files.file;
      let dirname = __dirname + "/../public/" + file.name.split(".")[1] + "/";
      const fs = require("fs");
      if (!fs.existsSync(dirname)) {
        fs.mkdir(dirname, { recursive: true }, (err) => {
          if (err) throw err;
        });
      }
      let name = file.name.split(".")[0] + "." + file.name.split(".")[1];
      name = name.replace(/\s+/g, "");
      let path = dirname + name;
      file.mv(path, (error) => {
        if (error) {
          res.json({ status: "error", message: error });
          return;
        } else {
          //console.log(dirname + name);
          res.json({
            status: "success",
            data: name,
          });
        }
      });
    }
  });
  app.post("/uploadImageProduct", (req, res) => {
    //console.log(req.files);
    if (req.files === null || req.files === undefined) {
      res.json({ status: false });
    } else {
      let file = req.files.file;
      let dirname = __dirname + "/../public/images/";
      const fs = require("fs");
      if (!fs.existsSync(dirname)) {
        fs.mkdir(dirname, { recursive: true }, (err) => {
          if (err) throw err;
        });
      }
      let name = file.name.split(".")[0] + "." + file.name.split(".")[1];
      name = name.replace(/\s+/g, "");
      let path = dirname + name;
      file.mv(path, (error) => {
        if (error) {
          res.json({ status: false, message: error });
          return;
        } else {
          //console.log(dirname + name);
          res.json({
            status: true,
            data: name,
          });
        }
      });
    }
  });
  async function sendfile(fileName, pathFile, res) {
    let file = "No found file";
    const fs = require("fs");
    // //console.log(pathFile);
    if (require("fs").existsSync(pathFile)) {
      let stat = fs.statSync(pathFile);
      let type = "";
      let arr = fileName.split(".");
      switch (arr[arr.length - 1]) {
        case "aac":
          type = "audio/aac";
          break;
        case "abw":
          type = "application/x-abiword";
          break;
        case "arc":
          type = "application/x-freearc";
          break;
        case "avi":
          type = "video/x-msvideo";
          break;
        case "azw":
          type = "application/vnd.amazon.ebook";
          break;
        case "bin":
          type = "application/octet-stream";
          break;
        case "bmp":
          type = "image/bmp";
          break;
        case "bz":
          type = "application/x-bzip";
          break;
        case "bz2":
          type = "application/x-bzip2";
          break;
        case "csh":
          type = "application/x-csh";
          break;
        case "css":
          type = "text/css";
          break;
        case "csv":
          type = "text/csv";
          break;
        case "doc":
          type = "application/msword";
          break;
        case "docx":
          type =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          break;
        case "eot":
          type = "application/vnd.ms-fontobject";
          break;
        case "epub":
          type = "application/epub+zip";
          break;
        case "gz":
          type = "application/gzip";
          break;
        case "gif":
          type = "image/gif";
          break;
        case "htm":
          type = "text/html";
          break;
        case "html":
          type = "text/html";
          break;
        case "ico":
          type = "image/vnd.microsoft.icon";
          break;
        case "ics":
          type = "text/calendar";
          break;
        case "jar":
          type = "application/java-archive";
          break;
        case "jpeg":
          type = "image/jpeg";
          break;
        case "jpg":
          type = "";
          break;
        case "js":
          type = "text/javascript, per the following specifications:";
          break;
        case "json":
          type = "application/json";
          break;
        case "jsonld":
          type = "application/ld+json";
          break;
        case "mid":
          type = "audio/midi";
          break;
        case "midi":
          type = "audio/x-midi";
          break;
        case "mjs":
          type = "text/javascript";
          break;
        case "mp3":
          type = "audio/mpeg";
          break;
        case "mpeg":
          type = "video/mpeg";
          break;
        case "mpkg":
          type = "application/vnd.apple.installer+xml";
          break;
        case "odp":
          type = "application/vnd.oasis.opendocument.presentation";
          break;
        case "ods":
          type = "application/vnd.oasis.opendocument.spreadsheet";
          break;
        case "odt":
          type = "application/vnd.oasis.opendocument.text";
          break;
        case "oga":
          type = "audio/ogg";
          break;
        case "ogv":
          type = "video/ogg";
          break;
        case "ogx":
          type = "application/ogg";
          break;
        case "opus":
          type = "audio/opus";
          break;
        case "otf":
          type = "font/otf";
          break;
        case "png":
          type = "image/png";
          break;
        case "pdf":
          type = "application/pdf";
          break;
        case "php":
          type = "application/x-httpd-php";
          break;
        case "ppt":
          type = "application/vnd.ms-powerpoint";
          break;
        case "pptx":
          type =
            "application/vnd.openxmlformats-officedocument.presentationml.presentation";
          break;
        case "rar":
          type = "application/vnd.rar";
          break;
        case "rtf":
          type = "application/rtf";
          break;
        case "sh":
          type = "application/x-sh";
          break;
        case "svg":
          type = "image/svg+xml";
          break;
        case "swf":
          type = "application/x-shockwave-flash";
          break;
        case "tar":
          type = "application/x-tar";
          break;
        case "tif":
          type = "image/tiff";
          break;
        case "tiff":
          type = "image/tiff";
          break;
        case "ts":
          type = "video/mp2t";
          break;
        case "ttf":
          type = "font/ttf";
          break;
        case "txt":
          type = "text/plain";
          break;
        case "vsd":
          type = "application/vnd.visio";
          break;
        case "wav":
          type = "audio/wav";
          break;
        case "weba":
          type = "audio/webm";
          break;
        case "webm":
          type = "video/webm";
          break;
        case "webp":
          type = "image/webp";
          break;
        case "woff":
          type = "font/woff";
          break;
        case "woff2":
          type = "font/woff2";
          break;
        case "xhtml":
          type = "application/xhtml+xml";
          break;
        case "xls":
          type = "application/vnd.ms-excel";
          break;
        case "xlsx":
          type =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          break;
        case "xml":
          type = "text/xml";
          break;
        case "xul":
          type = "application/vnd.mozilla.xul+xml";
          break;
        case "zip":
          type = "application/zip";
          break;
        case "3gp":
          type = "video/3gpp";
          break;
        case "3g2":
          type = "video/3gpp2";
          break;
        case "7z":
          type = "application/x-7z-compressed";
          break;
        default:
          type = "audio/mpeg";
      }
      res.writeHead(200, {
        "Content-Type": type,
        "Content-Length": stat.size,
        // "Content-Disposition": "attachment; filename=" + fileName,
      });

      let readStream = fs.createReadStream(pathFile);
      // We replaced all the event handlers with a simple call to readStream.pipe()
      readStream.on("open", function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res);
      });

      readStream.on("error", function (err) {
        res.end(err);
      });
    } else res.send(file);
  }
};
