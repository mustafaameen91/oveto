module.exports = (app) => {
   const invoiceType = require("../controllers/invoiceType.controllers.js");

   app.post("/api/addInvoiceType", invoiceType.create);

   app.get("/invoice/type", invoiceType.findAll);

   app.get("/invoice/invoiceType/:id", invoiceType.findOne);

   app.put("/invoice/type/:id", invoiceType.update);

   app.delete("/invoice/type/:id", invoiceType.delete);

   app.delete("/api/invoiceTypes", invoiceType.deleteAll);
};
