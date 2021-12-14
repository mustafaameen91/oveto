const Invoice = require("../models/invoice.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }
   console.log(req.body);
   let invoice = {
      invoice: {
         invoiceTypeId: req.body.invoice.invoiceTypeId,
         customerId: req.body.invoice.customerId,
         createdBy: req.body.invoice.createdBy,
         notice: req.body.invoice.notice,
         sellPriceId: req.body.invoice.sellPriceId,
         sellTypeId: req.body.invoice.sellTypeId,
         deliveryId: req.body.invoice.deliveryId
            ? req.body.invoice.deliveryId
            : null,
      },
      invoiceContent: req.body.invoiceContents.map((con) => {
         return {
            itemId: parseInt(con.itemId),
            count: parseInt(con.count),
            discount: con.discount,
            discountTypeId: con.discountTypeId,
            price: parseFloat(con.price),
            total: parseFloat(con.total),
         };
      }),
   };

   Invoice.create(invoice, (err, data) => {
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
   // let filtered = {};
   // let conditions = {};

   // if (req.query.id) {
   //    conditions.idInvoice = ParseInt(req.query.id);
   // }

   // if (req.query.date) {
   //    conditions.createdAt = req.query.date;
   // }

   // if (req.query.type) {
   //    conditions.invoiceTypeId = { in: req.query.type };
   // }

   // if (req.query.delivery) {
   //    conditions.deliveryId = { in: req.query.delivery };
   // }

   // if (req.query.customer) {
   //    conditions.customerId = { in: req.query.customer };
   // }

   // if (req.query.user) {
   //    conditions.createdBy = { in: req.query.user };
   // }

   // if (req.query.limit) {
   //    filtered.take = req.query.limit;
   // }

   // if (req.query.order) {
   //    let orderInvoice = req.query.order;
   //    filtered.orderBy = {};
   //    filtered.orderBy[orderInvoice] = req.query.order;
   // }

   // if (req.query.dateRangeFrom && req.query.dateRangeTo) {
   //    var startDate = new Date(req.query.dateRangeFrom);
   //    var endDate = new Date(req.query.dateRangeTo);

   //    conditions.orderDate = {
   //       lte: endDate.toISOString(),
   //       gte: startDate.toISOString(),
   //    };
   // }

   let query = "";
   let order = "";
   let limit = "";

   if (req.query.id != undefined) {
      query = query + ` AND idInvoice = ${req.query.id}`;
   }

   if (req.query.date != undefined) {
      query = query + ` AND DATE(createdAt) = '${req.query.date}'`;
   }

   if (
      req.query.dateRangeFrom != undefined &&
      req.query.dateRangeTo != undefined
   ) {
      query =
         query +
         ` AND DATE(createdAt) BETWEEN '${req.query.dateRangeFrom}' AND '${req.query.dateRangeTo}'`;
   }

   if (req.query.user != undefined) {
      query = query + ` AND createdBy IN (${req.query.user})`;
   }

   if (req.query.type != undefined) {
      query = query + ` AND invoiceTypeId IN (${req.query.type})`;
   }

   if (req.query.delivery != undefined) {
      query = query + ` AND deliveryId IN (${req.query.delivery})`;
   }

   if (req.query.customer != undefined) {
      query = query + ` AND customerId IN (${req.query.customer})`;
   }

   if (req.query.order != undefined) {
      order = "ORDER BY " + req.query.order + " " + req.query.sort;
   }

   if (req.query.limit != undefined) {
      limit = `LIMIT ${req.query.limit}`;
   }

   Invoice.findByIdFilter(query, order, limit, (err, data) => {
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
