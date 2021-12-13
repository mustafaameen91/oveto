module.exports = (app) => {
   const itemPrice = require("../controllers/itemPrice.controllers.js");

   app.post("/api/addItemPrice", itemPrice.create);

   app.get("/api/itemPrices", itemPrice.findAll);

   app.get("/api/itemPrice/:id", itemPrice.findOne);

   app.put("/item/updatePrice/:id", itemPrice.update);

   app.delete("/api/itemPrice/:id", itemPrice.delete);

   app.delete("/api/itemPrices", itemPrice.deleteAll);
};
