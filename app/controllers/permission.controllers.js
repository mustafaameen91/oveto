const Permission = require("../models/permission.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const permission = new Permission({
      permissionName: req.body.permissionName,
      permissionKey: req.body.permissionKey,
   });
   Permission.create(permission, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Permission.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAllWithRole = (req, res) => {
   Permission.getAllWithRole((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Permission.findById(req.params.id, (err, data) => {
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

   Permission.updateById(
      req.params.id,
      new Permission(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   Permission.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `permission was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Permission.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All permissions were deleted successfully!` });
   });
};
