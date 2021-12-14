const Item = require("../models/item.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   // const item = new Item({
   //    itemName: req.body.itemName,
   //    itemGroupId: req.body.itemGroupId * 1,
   //    itemCode: req.body.itemCode,
   //    itemBarcode: req.body.itemBarcode,
   //    imagePath: req.filePath,
   //    itemDescription: req.body.itemDescription,
   //    isAvailable: req.body.isAvailable * 1,
   // });

   let data = {
      itemInfo: {
         itemName: req.body.itemInfo.itemName,
         itemGroupId: req.body.itemInfo.itemGroup,
         itemCode: req.body.itemInfo.itemCode,
         itemBarcode: req.body.itemInfo.itemBarcode,
         itemPath: req.filePath,
         itemDescription: req.body.itemInfo.itemDescription,
         isAvailable: 1,
      },
      itemPrices: {
         sellPriceId: req.body.itemPrices.sellPriceId,
         price: req.body.itemPrices.price,
      },
      imagePath: req.filePath,
   };

   Item.create(data, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAllCount = (req, res) => {
   Item.getAllCount((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAllWithQuery = (req, res) => {
   Item.getAllWithQuery((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Item.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Item.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.updateImage = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Item.updateImageById(req.params.id, req.imagePath, (err, data) => {
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

   Item.updateById(req.params.id, new Item(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Item.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `item was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Item.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All items were deleted successfully!` });
   });
};
