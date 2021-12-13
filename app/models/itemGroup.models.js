const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const ItemGroup = function (itemGroup) {
   this.itemGroupName = itemGroup.itemGroupName;
};

ItemGroup.create = async (newItemGroup, result) => {
   try {
      const itemGroup = await prismaInstance.itemGroup.create({
         data: newItemGroup,
      });
      result(null, itemGroup);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ItemGroup.findById = async (itemGroupId, result) => {
   try {
      const singleItemGroup = await prismaInstance.itemGroup.findUnique({
         where: {
            idItemGroup: JSON.parse(itemGroupId),
         },
      });

      if (singleItemGroup) {
         result(null, singleItemGroup);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found itemGroup with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ItemGroup.getAll = async (result) => {
   try {
      const itemGroups = await prismaInstance.itemGroup.findMany({});
      result(null, itemGroups);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

ItemGroup.updateById = async (itemGroupId, itemGroup, result) => {
   try {
      const updateItemGroup = await prismaInstance.itemGroup.update({
         where: { idItemGroup: JSON.parse(itemGroupId) },
         data: itemGroup,
      });
      result(null, updateItemGroup);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ItemGroup.remove = async (id, result) => {
   try {
      const deleteItemGroup = await prismaInstance.itemGroup.delete({
         where: { idItemGroup: JSON.parse(id) },
      });
      result(null, deleteItemGroup);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

ItemGroup.removeAll = async (result) => {
   try {
      const deleteAllItemGroup = await prismaInstance.itemGroup.deleteMany({});
      result(null, deleteAllItemGroup);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = ItemGroup;
