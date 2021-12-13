module.exports = (app) => {
   const visitCause = require("../controllers/visitCause.controllers.js");

   app.post("/visitCause", visitCause.create);

   app.get("/visitCause", visitCause.findAll);

   app.get("/visitCause/:id", visitCause.findOne);

   app.put("/visitCause/:id", visitCause.update);

   app.delete("/visitCause/:id", visitCause.delete);

   app.delete("/api/visitCauses", visitCause.deleteAll);
};
