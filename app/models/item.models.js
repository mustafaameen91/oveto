const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Item = function (item) {
   this.itemName = item.itemName;
   this.itemGroupId = item.itemGroupId;
   this.itemCode = item.itemCode;
   this.itemBarcode = item.itemBarcode;
   this.imagePath = item.imagePath;
   this.itemDescription = item.itemDescription;
   this.isAvailable = item.isAvailable;
};

Item.create = async (newItem, result) => {
   let itemInfo = {
      ...newItem.itemInfo,
   };
   let itemPrices = newItem.itemPrices;
   try {
      const item = await prismaInstance.item.create({
         data: {
            ...itemInfo,
            prices: {
               create: itemPrices,
            },
         },
      });
      result(null, item);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Item.findById = async (itemId, result) => {
   try {
      const singleItem = await prismaInstance.item.findUnique({
         where: {
            idItem: JSON.parse(itemId),
         },
         include: {
            prices: true,
         },
      });

      if (singleItem) {
         result(null, singleItem);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found item with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Item.getAllCount = async (result) => {
   try {
      const items = await prismaInstance.item.count();
      result(null, { count: items });
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Item.getAllWithQuery = async (result) => {
   try {
      const items =
         await prismaInstance.$queryRaw`SELECT *, (SELECT @totalPlus := IFNULL(SUM(count), 0) FROM invoiceContent JOIN invoice ON invoiceContent.invoiceId = invoice.idInvoice JOIN invoiceType ON invoice.invoiceTypeId = invoiceType.idInvoiceType WHERE invoiceContent.itemId = item.idItem AND invoiceType.invoiceFunction = 'plus') AS totalPlus, (SELECT @totalMinus := IFNULL(SUM(count), 0) FROM invoiceContent JOIN invoice ON invoiceContent.invoiceId = invoice.idInvoice JOIN invoiceType ON invoice.invoiceTypeId = invoiceType.idInvoiceType WHERE invoiceContent.itemId = item.idItem AND invoiceType.invoiceFunction = 'minus') AS totalMinus, (@totalPlus - @totalMinus) AS store, (SELECT GROUP_CONCAT(json_object('price',price,'sellPriceId',sellPriceId,'sellPriceName',sellPriceName)) FROM itemPrice JOIN sellPrice ON itemPrice.sellPriceId = sellPrice.idSellPrice WHERE itemPrice.itemId = item.idItem) As prices FROM item LEFT JOIN itemGroup ON item.itemGroupId = itemGroup.idItemGroup`;
      let formattedItems = items.map((item) => {
         return {
            idItem: item.idItem,
            itemName: item.itemName,
            itemGroupId: item.itemGroupId,
            itemCode: item.itemCode,
            itemBarcode: item.itemBarcode,
            imagePath: item.imagePath,
            itemDescription: item.itemDescription,
            isAvailable: item.isAvailable,
            idItemGroup: item.idItemGroup,
            itemGroupName: item.itemGroupName,
            totalPlus: item.totalPlus,
            totalMinus: item.totalMinus,
            store: item.store,
            prices: JSON.parse(`[${item.prices}]`),
         };
      });
      console.log(formattedItems);
      result(null, formattedItems);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Item.getAll = async (result) => {
   try {
      const items = await prismaInstance.item.findMany({
         include: {
            itemGroup: true,
            prices: {
               include: {
                  sellPrice: true,
               },
            },
         },
      });

      let formattedItems = items.map((item) => {
         return {
            idItem: item.idItem,
            itemName: item.itemName,
            itemGroupId: item.itemGroupId,
            itemGroupName: item.itemGroup.itemGroupName,
            itemCode: item.itemCode,
            imagePath: item.imagePath,
            idItemGroup: item.itemGroup.idItemGroup,
            itemBarcode: item.itemBarcode,
            itemDescription: item.itemDescription,
            isAvailable: item.isAvailable,
            prices: item.prices.map((price) => {
               return {
                  price: price.price,
                  sellPriceId: price.sellPrice.idSellPrice,
                  sellPriceName: price.sellPrice.sellPriceName,
               };
            }),
         };
      });

      result(null, formattedItems);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Item.updateImageById = async (itemId, imagePath, result) => {
   try {
      const updateItem = await prismaInstance.item.update({
         where: { idItem: JSON.parse(itemId) },
         data: { imagePath: imagePath },
      });
      result(null, updateItem);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Item.updateById = async (itemId, item, result) => {
   try {
      const updateItem = await prismaInstance.item.update({
         where: { idItem: JSON.parse(itemId) },
         data: item,
      });
      result(null, updateItem);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Item.remove = async (id, result) => {
   try {
      const deleteItem = await prismaInstance.item.delete({
         where: { idItem: JSON.parse(id) },
      });
      result(null, deleteItem);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Item.removeAll = async (result) => {
   try {
      const deleteAllItem = await prismaInstance.item.deleteMany({});
      result(null, deleteAllItem);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Item;
