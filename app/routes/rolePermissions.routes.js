module.exports = (app) => {
   const rolePermissions = require("../controllers/rolePermissions.controllers.js");

   app.post("/api/addRolePermissions", rolePermissions.create);

   app.post("/permissions", rolePermissions.createWithRoles);

   app.get("/api/rolePermissions", rolePermissions.findAll);

   app.get("/permissions/role/:id", rolePermissions.findOneByRoleId);

   app.get("/api/rolePermission/:id", rolePermissions.findOne);

   app.get("/permissions/role", rolePermissions.findAllWithRoles);

   app.put("/api/rolePermission/:id", rolePermissions.update);

   app.delete("/api/rolePermission/:id", rolePermissions.delete);

   app.delete("/api/rolePermissions", rolePermissions.deleteAll);
};
