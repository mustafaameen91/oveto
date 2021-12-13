const SellPrice = require("../models/sellPrice.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const sellPrice = new SellPrice({
      sellPriceName: req.body.sellPriceName,
   });
   SellPrice.create(sellPrice, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   SellPrice.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   SellPrice.findById(req.params.id, (err, data) => {
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

   SellPrice.updateById(req.params.id, new SellPrice(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   SellPrice.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `sellPrice was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   SellPrice.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All sellPrices were deleted successfully!` });
   });
};
