const ItemPrice = require("../models/itemPrice.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const itemPrice = new ItemPrice({
      itemPricename: req.body.itemPricename,
      password: req.body.password,
      roleId: req.body.roleId,
      phone: req.body.phone,
      email: req.body.email,
   });
   ItemPrice.create(itemPrice, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ItemPrice.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ItemPrice.findById(req.params.id, (err, data) => {
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

   ItemPrice.updateById(req.params.id, new ItemPrice(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   ItemPrice.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `itemPrice was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ItemPrice.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All itemPrices were deleted successfully!` });
   });
};
