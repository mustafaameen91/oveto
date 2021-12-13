module.exports = (app) => {
   const supervisorDelegate = require("../controllers/supervisorDelegate.controllers.js");

   app.post("/supervisorDelegates/new", supervisorDelegate.create);

   app.get("/supervisorDelegates", supervisorDelegate.findAll);

   app.get("/supervisorDelegates/setting/:id", supervisorDelegate.findOne);

   app.get(
      "/supervisorDelegates/neglected/:id",
      supervisorDelegate.findOneNeglected
   );

   app.get(
      "/supervisorDelegates/userid/:id",
      supervisorDelegate.findOneByQuery
   );

   app.put("/supervisorDelegates/edit/:id", supervisorDelegate.update);

   app.delete("/supervisorDelegates/delete/:id", supervisorDelegate.delete);

   app.delete(
      "/supervisorDelegates/supervisorDelegate",
      supervisorDelegate.deleteAll
   );
};
