const Invoice = require("../models/invoice.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Invoice.create(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAllWithPostQuery = (req, res) => {
   Invoice.findByIdWithPostQuery(req.body.Invoices, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAllWithQuery = (req, res) => {
   Invoice.findByIdWithQuery(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Invoice.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findByFilter = (req, res) => {
   let filtered = {};
   let conditions = {};

   if (req.query.id) {
      conditions.idInvoice = ParseInt(req.query.id);
   }

   if (req.query.date) {
      conditions.createdAt = req.query.date;
   }

   if (req.query.type) {
      conditions.invoiceTypeId = { in: req.query.type };
   }

   if (req.query.delivery) {
      conditions.deliveryId = { in: req.query.delivery };
   }

   if (req.query.customer) {
      conditions.customerId = { in: req.query.customer };
   }

   if (req.query.user) {
      conditions.createdBy = { in: req.query.user };
   }

   if (req.query.limit) {
      filtered.take = req.query.limit;
   }

   if (req.query.order) {
      let orderInvoice = req.query.order;
      conditions.orderBy = {};
      conditions.orderBy[orderInvoice] = req.query.order;
   }

   if (req.query.dateRangeFrom && req.query.dateRangeTo) {
      var startDate = new Date(req.query.dateRangeFrom);
      var endDate = new Date(req.query.dateRangeTo);

      conditions.orderDate = {
         lte: endDate.toISOString(),
         gte: startDate.toISOString(),
      };
   }

   Invoice.findByIdFilter(filtered, conditions, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Invoice.findById(req.params.id, (err, data) => {
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

   Invoice.updateById(req.params.id, new Invoice(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.deleteMultiple = (req, res) => {
   Invoice.removeMultiple(req.body.invoices, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `invoice was deleted successfully!` });
   });
};

exports.delete = (req, res) => {
   Invoice.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `invoice was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Invoice.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All invoices were deleted successfully!` });
   });
};
