module.exports = (app) => {
   const user = require("../controllers/user.controllers.js");

   app.post("/users/new", user.create);

   app.get("/users", user.findAll);

   app.get("/users/:id", user.findOne);

   app.post("/users/login", user.login);

   app.put("/users/edit/:id", user.update);

   app.delete("/users/:id", user.delete);

   app.delete("/api/users", user.deleteAll);
};
