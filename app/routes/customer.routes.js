module.exports = (app) => {
   const customer = require("../controllers/customer.controllers.js");

   app.post("/customer/new", customer.create);

   app.get("/customers", customer.findAll);

   app.get("/customer/:id", customer.findOne);

   app.get("/customer/user/:id", customer.findOneByUserId);

   app.get("/customer/search/:id", customer.findOneBySearch);

   app.put("/customer/edit/:id", customer.update);

   app.delete("/customer/delete/:id", customer.delete);

   app.delete("/api/customers", customer.deleteAll);
};
