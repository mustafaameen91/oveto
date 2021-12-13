module.exports = (app) => {
   const deliveryStatus = require("../controllers/deliveryStatus.controllers.js");

   app.post("/api/addDeliveryStatus", deliveryStatus.create);

   app.get("/api/deliveryStatuses", deliveryStatus.findAll);

   app.get("/api/deliveryStatus/:id", deliveryStatus.findOne);

   app.put("/api/deliveryStatus/:id", deliveryStatus.update);

   app.delete("/api/deliveryStatus/:id", deliveryStatus.delete);

   app.delete("/api/deliveryStatuses", deliveryStatus.deleteAll);
};
