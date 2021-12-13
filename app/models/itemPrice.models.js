const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const ItemPrice = function (itemPrice) {
   this.itemPricename = itemPrice.itemPricename;
   this.password = itemPrice.password;
   this.roleId = itemPrice.roleId;
   this.phone = itemPrice.phone;
   this.email = itemPrice.email;
};

ItemPrice.create = async (newItemPrice, result) => {
   try {
      const itemPrice = await prismaInstance.itemPrice.create({
         data: newItemPrice,
      });
      result(null, itemPrice);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ItemPrice.findById = async (itemPriceId, result) => {
   try {
      const singleItemPrice = await prismaInstance.itemPrice.findUnique({
         where: {
            idItemPrice: JSON.parse(itemPriceId),
         },
      });

      if (singleItemPrice) {
         result(null, singleItemPrice);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found itemPrice with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ItemPrice.getAll = async (result) => {
   try {
      const itemPrices = await prismaInstance.itemPrice.findMany({});
      result(null, itemPrices);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ItemPrice.updateById = async (itemPriceId, itemPrice, result) => {
   try {
      const updateItemPrice = await prismaInstance.itemPrice.update({
         where: { idItemPrice: JSON.parse(itemPriceId) },
         data: itemPrice,
      });
      result(null, updateItemPrice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ItemPrice.remove = async (id, result) => {
   try {
      const deleteItemPrice = await prismaInstance.itemPrice.delete({
         where: { idItemPrice: JSON.parse(id) },
      });
      result(null, deleteItemPrice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ItemPrice.removeAll = async (result) => {
   try {
      const deleteAllItemPrice = await prismaInstance.itemPrice.deleteMany({});
      result(null, deleteAllItemPrice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = ItemPrice;
