module.exports = (app) => {
   const visit = require("../controllers/visit.controllers.js");

   app.post("/visit", visit.create);

   app.get("/visit", visit.findAll);

   app.get("/visit/user/:id", visit.findAllByDate);

   app.get("/api/visit/:id", visit.findOne);

   app.put("/visit/:id", visit.update);

   app.delete("/visit/:id", visit.delete);

   app.delete("/api/visits", visit.deleteAll);
};
