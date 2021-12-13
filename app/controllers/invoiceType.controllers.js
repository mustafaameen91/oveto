const InvoiceType = require("../models/invoiceType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const invoiceType = new InvoiceType({
      invoiceTypeName: req.body.invoiceTypeName,
      invoiceFunction: req.body.invoiceFunction,
   });
   InvoiceType.create(invoiceType, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   InvoiceType.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   InvoiceType.findById(req.params.id, (err, data) => {
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

   InvoiceType.updateById(
      req.params.id,
      new InvoiceType(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   InvoiceType.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `invoiceType was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   InvoiceType.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All invoiceTypes were deleted successfully!` });
   });
};
