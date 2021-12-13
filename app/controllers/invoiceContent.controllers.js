const InvoiceContent = require("../models/invoiceContent.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const invoiceContent = new InvoiceContent({
      invoiceId: req.body.invoiceId,
      itemId: req.body.itemId,
      count: req.body.count,
      discount: req.body.discount,
      discountTypeId: req.body.discountTypeId,
      price: req.body.price,
      total: req.body.total,
   });
   InvoiceContent.create(invoiceContent, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   InvoiceContent.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   InvoiceContent.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.updateDelegate = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   InvoiceContent.updateByDelegate(
      req.body.deliveryId,
      req.body.invoices,
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.updateDelivery = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   InvoiceContent.updateByDelivery(
      req.body.deliveryId,
      req.body.invoices,
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   InvoiceContent.updateById(
      req.params.id,
      new InvoiceContent(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   InvoiceContent.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `invoiceContent was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   InvoiceContent.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All invoiceContents were deleted successfully!`,
         });
   });
};
