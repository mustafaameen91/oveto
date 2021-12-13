const CustomerClass = require("../models/customerClass.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const customerClass = new CustomerClass({
      customerClassName: req.body.customerClassName,
      password: req.body.password,
      roleId: req.body.roleId,
      phone: req.body.phone,
      email: req.body.email,
   });
   CustomerClass.create(customerClass, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   CustomerClass.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   CustomerClass.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   CustomerClass.updateById(
      req.params.id,
      new CustomerClass(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   CustomerClass.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `customerClass was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   CustomerClass.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All customerClasss were deleted successfully!` });
   });
};
