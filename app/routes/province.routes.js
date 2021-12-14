module.exports = (app) => {
   const province = require("../controllers/province.controllers.js");

   app.post("/province/new", province.create);

   app.get("/provinces", province.findAll);

   app.get("/province/:id", province.findOne);

   app.put("/province/edit/:id", province.update);

   app.delete("/province/delete/:id", province.delete);

   app.delete("/api/provinces", province.deleteAll);
};
