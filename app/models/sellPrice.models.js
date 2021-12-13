const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const SellPrice = function (sellPrice) {
   this.sellPriceName = sellPrice.sellPriceName;
};

SellPrice.create = async (newSellPrice, result) => {
   try {
      const sellPrice = await prismaInstance.sellPrice.create({
         data: newSellPrice,
      });
      result(null, sellPrice);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SellPrice.findById = async (sellPriceId, result) => {
   try {
      const singleSellPrice = await prismaInstance.sellPrice.findUnique({
         where: {
            idSellPrice: JSON.parse(sellPriceId),
         },
      });

      if (singleSellPrice) {
         result(null, singleSellPrice);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found sellPrice with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SellPrice.getAll = async (result) => {
   try {
      const sellPrices = await prismaInstance.sellPrice.findMany({});
      result(null, sellPrices);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SellPrice.updateById = async (sellPriceId, sellPrice, result) => {
   try {
      const updateSellPrice = await prismaInstance.sellPrice.update({
         where: { idSellPrice: JSON.parse(sellPriceId) },
         data: sellPrice,
      });
      result(null, updateSellPrice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

SellPrice.remove = async (id, result) => {
   try {
      const deleteSellPrice = await prismaInstance.sellPrice.delete({
         where: { idSellPrice: JSON.parse(id) },
      });
      result(null, deleteSellPrice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

SellPrice.removeAll = async (result) => {
   try {
      const deleteAllSellPrice = await prismaInstance.sellPrice.deleteMany({});
      result(null, deleteAllSellPrice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = SellPrice;
