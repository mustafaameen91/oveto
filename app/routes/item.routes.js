module.exports = (app) => {
   const item = require("../controllers/item.controllers.js");
   const saveImage = require("../middleware/saveImage.middleware.js");

   app.post("/item/new", saveImage.resize, item.create);

   app.get("/item", item.findAll);

   app.get("/item/store", item.findAllWithQuery);

   app.get("/item/count", item.findAllCount);

   app.get("/item/:id", item.findOne);

   app.put("/item/edit/:id", item.update);

   app.put("/item/updateImage/:id", saveImage.resize, item.updateImage);

   app.delete("/item/delete/:id", item.delete);

   app.delete("/api/items", item.deleteAll);
};
