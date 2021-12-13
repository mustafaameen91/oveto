const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const CustomerClass = function (customerClass) {
   this.customerClassName = customerClass.customerClassName;
};

CustomerClass.create = async (newCustomerClass, result) => {
   try {
      const customerClass = await prismaInstance.customerClass.create({
         data: newCustomerClass,
      });
      result(null, customerClass);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

CustomerClass.findById = async (customerClassId, result) => {
   try {
      const singleCustomerClass = await prismaInstance.customerClass.findUnique(
         {
            where: {
               idCustomerClass: JSON.parse(customerClassId),
            },
         }
      );

      if (singleCustomerClass) {
         result(null, singleCustomerClass);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found customerClass with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

CustomerClass.getAll = async (result) => {
   try {
      const customerClasss = await prismaInstance.customerClass.findMany({});
      result(null, customerClasss);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

CustomerClass.updateById = async (customerClassId, customerClass, result) => {
   try {
      const updateCustomerClass = await prismaInstance.customerClass.update({
         where: { idCustomerClass: JSON.parse(customerClassId) },
         data: customerClass,
      });
      result(null, updateCustomerClass);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

CustomerClass.remove = async (id, result) => {
   try {
      const deleteCustomerClass = await prismaInstance.customerClass.delete({
         where: { idCustomerClass: JSON.parse(id) },
      });
      result(null, deleteCustomerClass);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

CustomerClass.removeAll = async (result) => {
   try {
      const deleteAllCustomerClass =
         await prismaInstance.customerClass.deleteMany({});
      result(null, deleteAllCustomerClass);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = CustomerClass;
