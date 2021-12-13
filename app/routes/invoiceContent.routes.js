module.exports = (app) => {
   const invoiceContent = require("../controllers/invoiceContent.controllers.js");

   app.post("/addItemToInvoice", invoiceContent.create);

   app.get("/api/invoiceContents", invoiceContent.findAll);

   app.get("/api/invoiceContent/:id", invoiceContent.findOne);

   app.put("/invoice/emptyQuntityOfItem/:id", invoiceContent.update);

   app.put("/invoice/setDelivery", invoiceContent.updateDelivery);

   app.put("/invoice/setDelegate", invoiceContent.updateDelegate);

   app.delete("/invoice/item/:id", invoiceContent.delete);

   app.delete("/api/invoiceContents", invoiceContent.deleteAll);
};
