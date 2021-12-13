module.exports = (app) => {
   const settings = require("../controllers/settings.controllers.js");

   app.post("/api/addSettings", settings.create);

   app.get("/settings", settings.findAll);

   app.get("/setting/:id", settings.findOne);

   app.put("/setting/edit/:id", settings.update);

   app.put("/settings", settings.updateForAhmed);

   app.delete("/api/setting/:id", settings.delete);

   app.delete("/api/settings", settings.deleteAll);
};
