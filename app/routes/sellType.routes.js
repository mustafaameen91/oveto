module.exports = (app) => {
   const sellType = require("../controllers/sellType.controllers.js");

   app.post("/selltype/new", sellType.create);

   app.get("/selltype", sellType.findAll);

   app.get("/selltype/:id", sellType.findOne);

   app.put("/selltype/edit/:id", sellType.update);

   app.delete("/selltype/delete/:id", sellType.delete);

   app.delete("/api/sellTypes", sellType.deleteAll);
};
