const DeliveryStatus = require("../models/deliveryStatus.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const deliveryStatus = new DeliveryStatus({
      deliveryId: req.body.deliveryId,
      invoiceId: req.body.invoiceId,
      startedAt: req.body.startedAt,
      deliveredAt: req.body.deliveredAt,
      notice: req.body.notice,
   });
   DeliveryStatus.create(deliveryStatus, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   DeliveryStatus.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   DeliveryStatus.findById(req.params.id, (err, data) => {
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

   DeliveryStatus.updateById(
      req.params.id,
      new DeliveryStatus(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   DeliveryStatus.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `deliveryStatus was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   DeliveryStatus.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All deliveryStatuss were deleted successfully!`,
         });
   });
};
