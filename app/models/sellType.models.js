const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const SellType = function (sellType) {
   this.sellTypeName = sellType.sellTypeName;
};

SellType.create = async (newSellType, result) => {
   try {
      const sellType = await prismaInstance.sellType.create({
         data: newSellType,
      });
      result(null, sellType);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SellType.findById = async (sellTypeId, result) => {
   try {
      const singleSellType = await prismaInstance.sellType.findUnique({
         where: {
            idSellType: JSON.parse(sellTypeId),
         },
      });

      if (singleSellType) {
         result(null, singleSellType);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found sellType with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SellType.getAll = async (result) => {
   try {
      const sellTypes = await prismaInstance.sellType.findMany({});
      result(null, sellTypes);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SellType.updateById = async (sellTypeId, sellType, result) => {
   try {
      const updateSellType = await prismaInstance.sellType.update({
         where: { idSellType: JSON.parse(sellTypeId) },
         data: sellType,
      });
      result(null, updateSellType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

SellType.remove = async (id, result) => {
   try {
      const deleteSellType = await prismaInstance.sellType.delete({
         where: { idSellType: JSON.parse(id) },
      });
      result(null, deleteSellType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

SellType.removeAll = async (result) => {
   try {
      const deleteAllSellType = await prismaInstance.sellType.deleteMany({});
      result(null, deleteAllSellType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = SellType;
