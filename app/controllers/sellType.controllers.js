const SellType = require("../models/sellType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const sellType = new SellType({
      sellTypeName: req.body.sellTypeName,
   });

   SellType.create(sellType, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   SellType.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   SellType.findById(req.params.id, (err, data) => {
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

   SellType.updateById(req.params.id, new SellType(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   SellType.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `sellType was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   SellType.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All sellTypes were deleted successfully!` });
   });
};
