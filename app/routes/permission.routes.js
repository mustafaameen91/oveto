module.exports = (app) => {
   const permission = require("../controllers/permission.controllers.js");

   app.post("/api/addPermission", permission.create);

   app.get("/permissions", permission.findAll);

   app.get("/api/permissions/role", permission.findAllWithRole);

   app.get("/api/permission/:id", permission.findOne);

   app.put("/api/permission/:id", permission.update);

   app.delete("/api/permission/:id", permission.delete);

   app.delete("/api/permissions", permission.deleteAll);
};
