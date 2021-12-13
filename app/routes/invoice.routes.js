module.exports = (app) => {
   const invoice = require("../controllers/invoice.controllers.js");

   app.post("/invoice/new", invoice.create);

   app.post("/invoice/multiple", invoice.findAllWithPostQuery);

   app.get("/invoice", invoice.findAll);

   app.get("/invoice/id/:id", invoice.findAllWithQuery);

   app.get("/api/invoice/:id", invoice.findOne);

   app.get("/invoice/filter", invoice.findByFilter);

   app.put("/invoice/edit/:id", invoice.update);

   app.delete("/invoice/edit/:id", invoice.delete);

   app.delete("/invoice/deleteMultiple", invoice.deleteMultiple);

   app.delete("/api/invoices", invoice.deleteAll);
};
