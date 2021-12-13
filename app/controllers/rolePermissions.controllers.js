const RolePermissions = require("../models/rolePermissions.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const rolePermissions = new RolePermissions({
      roleId: req.body.roleId,
      permissionId: req.body.permissionId,
   });
   RolePermissions.create(rolePermissions, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.createWithRoles = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   RolePermissions.createByRoles(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   RolePermissions.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAllWithRoles = (req, res) => {
   RolePermissions.getAllWithRoles((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneByRoleId = (req, res) => {
   RolePermissions.findByRoleId(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   RolePermissions.findById(req.params.id, (err, data) => {
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

   RolePermissions.updateById(
      req.params.id,
      new RolePermissions(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   RolePermissions.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `rolePermissions was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   RolePermissions.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All rolePermissions were deleted successfully!`,
         });
   });
};
