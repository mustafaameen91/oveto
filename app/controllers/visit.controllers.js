const Visit = require("../models/visit.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const visit = new Visit({
      createdBy: req.body.createdBy,
      customerId: req.body.customerId,
      visitCauseId: req.body.visitCauseId,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
   });
   Visit.create(visit, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Visit.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Visit.findById(req.params.id, (err, data) => {
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

   Visit.updateById(req.params.id, new Visit(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Visit.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `visit was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Visit.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All visits were deleted successfully!` });
   });
};
