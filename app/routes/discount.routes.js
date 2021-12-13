module.exports = (app) => {
   const discount = require("../controllers/discount.controllers.js");

   app.post("/discount/new", discount.create);

   app.get("/discount", discount.findAll);

   app.get("/discount/:id", discount.findOne);

   app.put("/discount/edit/:id", discount.update);

   app.delete("/discount/delete/:id", discount.delete);

   app.delete("/api/discounts", discount.deleteAll);
};
