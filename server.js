const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

require("./app/routes/user.routes.js")(app);
require("./app/routes/visitCause.routes.js")(app);
require("./app/routes/visit.routes.js")(app);
require("./app/routes/userPermissions.routes.js")(app);
require("./app/routes/settings.routes.js")(app);
require("./app/routes/sellPrice.routes.js")(app);
require("./app/routes/sellType.routes.js")(app);
require("./app/routes/role.routes.js")(app);
require("./app/routes/rolePermissions.routes")(app);
require("./app/routes/permission.routes.js")(app);
require("./app/routes/item.routes.js")(app);
require("./app/routes/itemPrice.routes.js")(app);
require("./app/routes/itemGroup.routes.js")(app);
require("./app/routes/invoice.routes.js")(app);
require("./app/routes/invoiceContent.routes.js")(app);
require("./app/routes/invoiceType.routes.js")(app);
require("./app/routes/discount.routes.js")(app);
require("./app/routes/customer.routes.js")(app);
require("./app/routes/customerClass.routes.js")(app);
require("./app/routes/deliveryStatus.routes.js")(app);
require("./app/routes/supervisorDelegate.routes.js")(app);

app.get("/files/uploads/:file", function (request, response) {
   console.log(dirRoot);
   let file = request.params.file;
   var extension = file.split(".").pop();
   var tempFile = path.join(__dirname, "..", "uploads/" + file);
   console.log(dirRoot);
   fs.readFile(tempFile, function (err, data) {
      console.log(err);
      switch (extension) {
         case "jpg":
            contentType = "image/jpg";
            isImage = 1;
            break;
         case "png":
            contentType = "image/png";
            isImage = 1;
            break;
         case "pdf":
            contentType = "application/pdf";
            isImage = 2;
            break;
         case "jpeg":
            contentType = "image/jpeg";
            isImage = 1;
            break;
      }
      response.contentType(contentType);
      response.send(data);
   });
});

app.listen(5220, () => {
   console.log("app listening on port 5100");
});
