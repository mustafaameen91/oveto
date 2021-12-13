const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Discount = function (discount) {
   this.discountName = discount.discountName;
};

Discount.create = async (newDiscount, result) => {
   try {
      const discount = await prismaInstance.discount.create({
         data: newDiscount,
      });
      result(null, discount);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Discount.findById = async (discountId, result) => {
   try {
      const singleDiscount = await prismaInstance.discount.findUnique({
         where: {
            idDiscount: JSON.parse(discountId),
         },
      });

      if (singleDiscount) {
         result(null, singleDiscount);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found discount with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Discount.getAll = async (result) => {
   try {
      const discounts = await prismaInstance.discount.findMany({});
      result(null, discounts);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Discount.updateById = async (discountId, discount, result) => {
   try {
      const updateDiscount = await prismaInstance.discount.update({
         where: { idDiscount: JSON.parse(discountId) },
         data: discount,
      });
      result(null, updateDiscount);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Discount.remove = async (id, result) => {
   try {
      const deleteDiscount = await prismaInstance.discount.delete({
         where: { idDiscount: JSON.parse(id) },
      });
      result(null, deleteDiscount);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Discount.removeAll = async (result) => {
   try {
      const deleteAllDiscount = await prismaInstance.discount.deleteMany({});
      result(null, deleteAllDiscount);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Discount;
