module.exports = (app) => {
   const role = require("../controllers/role.controllers.js");

   app.post("/api/addRole", role.create);

   app.get("/users/roles/all", role.findAll);

   app.get("/api/role/:id", role.findOne);

   app.get("/users/role/:id", role.findUsersByRole);

   app.put("/api/role/:id", role.update);

   app.delete("/api/role/:id", role.delete);

   app.delete("/api/roles", role.deleteAll);
};
