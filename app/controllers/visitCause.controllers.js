const VisitCause = require("../models/visitCause.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const visitCause = new VisitCause({
      visitCauseName: req.body.visitCauseName,
   });
   VisitCause.create(visitCause, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   VisitCause.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   VisitCause.findById(req.params.id, (err, data) => {
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

   VisitCause.updateById(
      req.params.id,
      new VisitCause(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   VisitCause.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `visitCause was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   VisitCause.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All visitCauses were deleted successfully!` });
   });
};
