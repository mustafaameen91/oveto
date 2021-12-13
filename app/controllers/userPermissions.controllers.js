const UserPermissions = require("../models/userPermissions.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const userPermissions = new UserPermissions({
      userId: req.body.userId,
      permissionId: req.body.permissionId,
   });
   UserPermissions.create(userPermissions, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   UserPermissions.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   UserPermissions.findById(req.params.id, (err, data) => {
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

   UserPermissions.updateById(
      req.params.id,
      new UserPermissions(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   UserPermissions.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `userPermissions was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   UserPermissions.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All userPermissions were deleted successfully!`,
         });
   });
};
