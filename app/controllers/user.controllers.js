const User = require("../models/user.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const user = new User({
      username: req.body.username,
      password: req.body.password,
      roleId: req.body.roleId,
      phone: req.body.phone,
      email: req.body.email,
   });
   User.create(user, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   User.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   User.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.login = (req, res) => {
   User.loginUser(req.body, (err, data) => {
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

   User.updateById(req.params.id, new User(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   User.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `user was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   User.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All users were deleted successfully!` });
   });
};
