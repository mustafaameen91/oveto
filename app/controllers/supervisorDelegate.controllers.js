const SupervisorDelegate = require("../models/supervisorDelegate.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const supervisorDelegate = new SupervisorDelegate({
      supervisorId: req.body.supervisorId,
      delegateId: req.body.delegateId,
   });
   SupervisorDelegate.create(supervisorDelegate, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   SupervisorDelegate.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneNeglected = (req, res) => {
   let date = new Date(req.query.date);

   let day = date.toLocaleDateString("en", { weekday: "long" });

   SupervisorDelegate.findByNeglected(
      req.params.id,
      day.toLowerCase(),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.findOneByQuery = (req, res) => {
   let date = "CURRENT_DATE";
   if (req.query.date == undefined || req.query.date == null) {
      date = "CURRENT_DATE";
   } else {
      date = req.query.date;
   }
   SupervisorDelegate.findByQuery(req.params.id, date, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   SupervisorDelegate.findById(req.params.id, (err, data) => {
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

   SupervisorDelegate.updateById(
      req.params.id,
      new SupervisorDelegate(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   SupervisorDelegate.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `supervisorDelegate was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   SupervisorDelegate.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All supervisorDelegate were deleted successfully!`,
         });
   });
};
