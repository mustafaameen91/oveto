module.exports = (app) => {
   const customerClass = require("../controllers/customerClass.controllers.js");

   app.post("/customerClass", customerClass.create);

   app.get("/customerClass", customerClass.findAll);

   app.get("/customerClass/:id", customerClass.findOne);

   app.put("/customerClass/:id", customerClass.update);

   app.delete("/customerClass/:id", customerClass.delete);

   app.delete("/api/customerClasses", customerClass.deleteAll);
};
