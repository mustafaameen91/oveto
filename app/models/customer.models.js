const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Customer = function (customer) {
   this.customerName = customer.customerName;
   this.storeName = customer.storeName;
   this.createdBy = customer.createdBy;
   this.phone = customer.phone;
   this.secondPhone = customer.secondPhone;
   this.email = customer.email;
   this.sellPriceId = customer.sellPriceId;
   this.location = customer.location;
   this.nearby = customer.nearby;
   this.provinceId = customer.provinceId;
   this.visitDay = customer.visitDay;
   this.secondVisitDay = customer.secondVisitDay;
   this.visitTimeFrom = customer.visitTimeFrom;
   this.visitTimeTo = customer.visitTimeTo;
   this.customerClassId = customer.customerClassId;
};

Customer.create = async (newCustomer, result) => {
   try {
      const customer = await prismaInstance.customer.create({
         data: newCustomer,
      });
      result(null, customer);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Customer.findBySearch = async (userId, name, result) => {
   try {
      const singleCustomer = await prismaInstance.customer.findMany({
         where: {
            OR: [
               {
                  storeName: {
                     contains: name,
                  },
               },
               {
                  createdBy: JSON.parse(userId),
               },
               {
                  idCustomer: name,
               },
            ],
         },
         take: 15,
      });

      if (singleCustomer) {
         result(null, singleCustomer);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found customer with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Customer.findByUserId = async (userId, result) => {
   try {
      const singleCustomer = await prismaInstance.customer.findMany({
         where: {
            createdBy: JSON.parse(userId),
         },
         include: {
            sellPrice: true,
            province: true,
         },
      });

      if (singleCustomer) {
         let data = singleCustomer.map((customer) => {
            return {
               idCustomer: customer.idCustomer,
               customerName: customer.customerName,
               storeName: customer.storeName,
               createdAt: new Date(customer.createdAt).toLocaleDateString(),
               createdBy: customer.createdBy,
               phone: customer.phone,
               secondPhone: customer.secondPhone,
               email: customer.email,
               sellPriceId: customer.sellPriceId,
               location: customer.location,
               nearby: customer.nearby,
               provinceId: customer.provinceId,
               provinceName: customer.province.provinceName,
               visitDay: customer.visitDay,
               secondVisitDay: customer.secondVisitDay,
               visitTimeFrom: customer.visitTimeFrom,
               visitTimeTo: customer.visitTimeTo,
               customerClassId: customer.customerClassId,
               idSellPrice: customer.sellPrice.idSellPrice,
               sellPriceName: customer.sellPrice.sellPriceName,
            };
         });
         result(null, data);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found customer with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Customer.findById = async (customerId, result) => {
   try {
      const singleCustomer = await prismaInstance.customer.findUnique({
         where: {
            idCustomer: JSON.parse(customerId),
         },
         include: {
            province: true,
            sellPrice: true,
         },
      });

      if (singleCustomer) {
         let data = {
            idCustomer: singleCustomer.idCustomer,
            customerName: singleCustomer.customerName,
            storeName: singleCustomer.storeName,
            createdAt: new Date(singleCustomer.createdAt).toLocaleDateString(),
            createdBy: singleCustomer.createdBy,
            phone: singleCustomer.phone,
            secondPhone: singleCustomer.secondPhone,
            email: singleCustomer.email,
            sellPriceId: singleCustomer.sellPriceId,
            location: singleCustomer.location,
            nearby: singleCustomer.nearby,
            provinceId: singleCustomer.provinceId,
            provinceName: singleCustomer.province.provinceName,
            visitDay: singleCustomer.visitDay,
            secondVisitDay: singleCustomer.secondVisitDay,
            visitTimeFrom: singleCustomer.visitTimeFrom,
            visitTimeTo: singleCustomer.visitTimeTo,
            customerClassId: singleCustomer.customerClassId,
            idSellPrice: singleCustomer.sellPrice.idSellPrice,
            sellPriceName: singleCustomer.sellPrice.sellPriceName,
         };

         result(null, data);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found customer with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Customer.getAll = async (result) => {
   try {
      const customers = await prismaInstance.customer.findMany({
         include: {
            sellPrice: true,
         },
      });
      result(null, customers);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Customer.updateById = async (customerId, customer, result) => {
   try {
      const updateCustomer = await prismaInstance.customer.update({
         where: { idCustomer: JSON.parse(customerId) },
         data: customer,
      });
      result(null, updateCustomer);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Customer.remove = async (id, result) => {
   try {
      const deleteCustomer = await prismaInstance.customer.delete({
         where: { idCustomer: JSON.parse(id) },
      });
      result(null, deleteCustomer);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Customer.removeAll = async (result) => {
   try {
      const deleteAllCustomer = await prismaInstance.customer.deleteMany({});
      result(null, deleteAllCustomer);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Customer;
