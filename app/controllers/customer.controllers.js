const Customer = require("../models/customer.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const customer = new Customer({
      customerName: req.body.customerName,
      storeName: req.body.storeName,
      createdBy: req.body.createdBy,
      phone: req.body.phone,
      secondPhone: req.body.secondPhone,
      email: req.body.email,
      sellPriceId: req.body.sellPriceId,
      location: req.body.location,
      nearby: req.body.nearby,
      provinceId: req.body.provinceId,
      visitDay: req.body.visitDay,
      secondVisitDay: req.body.secondVisitDay,
      visitTimeFrom: req.body.visitTimeFrom,
      visitTimeTo: req.body.visitTimeTo,
      customerClassId: req.body.customerClassId,
   });
   Customer.create(customer, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Customer.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneBySearch = (req, res) => {
   Customer.findBySearch(req.params.id, req.query.name, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneByUserId = (req, res) => {
   Customer.findByUserId(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Customer.findById(req.params.id, (err, data) => {
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

   Customer.updateById(req.params.id, new Customer(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Customer.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `customer was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Customer.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All customers were deleted successfully!` });
   });
};
