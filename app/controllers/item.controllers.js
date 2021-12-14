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

   let itemInfo = JSON.parse(req.body.itemInfo);
   let itemPrice = JSON.parse(req.body.itemPrices);

   console.log(itemInfo);
   console.log(itemPrice);

   let data = {
      itemInfo: {
         itemName: itemInfo.itemName,
         itemGroupId: itemInfo.itemGroup,
         itemCode: itemInfo.itemCode,
         itemBarcode: itemInfo.itemBarcode,
         imagePath: req.filePath,
         itemDescription: itemInfo.itemDescription,
         isAvailable: 1,
      },
      itemPrices: itemPrice.map((item) => {
         return {
            sellPriceId: item.sellPriceId,
            price: parseFloat(item.price),
         };
      }),
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

   Item.updateImageById(req.params.id, req.filePath, (err, data) => {
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

   let data = {
      itemName: req.body.itemName,
      itemGroupId: req.body.itemGroupId * 1,
      itemCode: req.body.itemCode,
      itemBarcode: req.body.itemBarcode,
      imagePath: req.filePath,
      itemDescription: req.body.itemDescription,
      isAvailable: req.body.isAvailable ? 1 : 0,
   };

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
