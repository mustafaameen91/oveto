const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function generateRandomName(length, studentId) {
   var result = "";
   var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result +=
         characters.charAt(Math.floor(Math.random() * charactersLength)) +
         studentId;
   }
   return result;
}

exports.resize = (req, res, next) => {
   if (req.files) {
      var file = req.files.itemImage;
      var filename = file.name;

      var ext = filename.substr(filename.lastIndexOf(".") + 1);
      let imageName = `${generateRandomName(8, 5)}.${ext}`;

      file.mv(path.join(__dirname, `../uploads/${imageName}`), function (err) {
         if (err) return res.status(500).send(err);
         req.filePath = `uploads/${imageName}`;
         next();
      });
   } else {
      return res.status(400).json({
         message: "bad request",
         error: "no file found",
      });
   }
};
