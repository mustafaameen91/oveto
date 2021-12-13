const ItemGroup = require("../models/itemGroup.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const itemGroup = new ItemGroup({
      itemGroupName: req.body.itemGroupName,
   });
   ItemGroup.create(itemGroup, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ItemGroup.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ItemGroup.findById(req.params.id, (err, data) => {
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

   ItemGroup.updateById(req.params.id, new ItemGroup(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   ItemGroup.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `itemGroup was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ItemGroup.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All itemGroups were deleted successfully!` });
   });
};
