module.exports = (app) => {
   const userPermissions = require("../controllers/userPermissions.controllers.js");

   app.post("/api/addUserPermissions", userPermissions.create);

   app.get("/api/userPermissions", userPermissions.findAll);

   app.get("/api/setting/:id", userPermissions.findOne);

   app.put("/api/setting/:id", userPermissions.update);

   app.delete("/api/setting/:id", userPermissions.delete);

   app.delete("/api/userPermissions", userPermissions.deleteAll);
};
