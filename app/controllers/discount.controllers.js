const Discount = require("../models/discount.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const discount = new Discount({
      discountName: req.body.discountName,
   });
   Discount.create(discount, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Discount.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Discount.findById(req.params.id, (err, data) => {
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

   Discount.updateById(req.params.id, new Discount(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Discount.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `discount was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Discount.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All discounts were deleted successfully!` });
   });
};
