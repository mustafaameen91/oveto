module.exports = (app) => {
   const sellPrice = require("../controllers/sellPrice.controllers.js");

   app.post("/sellprice/new", sellPrice.create);

   app.get("/sellprice", sellPrice.findAll);

   app.get("/sellprice/:id", sellPrice.findOne);

   app.put("/sellprice/edit/:id", sellPrice.update);

   app.delete("/sellprice/delete/:id", sellPrice.delete);

   app.delete("/api/sellPrices", sellPrice.deleteAll);
};
