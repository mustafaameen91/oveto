module.exports = (app) => {
   const itemGroup = require("../controllers/itemGroup.controllers.js");

   app.post("/itemgroup/new", itemGroup.create);

   app.get("/itemgroup", itemGroup.findAll);

   app.get("/itemgroup/:id", itemGroup.findOne);

   app.put("/itemgroup/edit/:id", itemGroup.update);

   app.delete("/itemgroup/delete/:id", itemGroup.delete);

   app.delete("/api/itemGroups", itemGroup.deleteAll);
};
