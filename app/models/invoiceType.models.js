const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const InvoiceType = function (invoiceType) {
   this.invoiceTypeName = invoiceType.invoiceTypeName;
   this.invoiceFunction = invoiceType.invoiceFunction;
};

InvoiceType.create = async (newInvoiceType, result) => {
   try {
      const invoiceType = await prismaInstance.invoiceType.create({
         data: newInvoiceType,
      });
      result(null, invoiceType);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

InvoiceType.findById = async (invoiceTypeId, result) => {
   try {
      const singleInvoiceType = await prismaInstance.invoiceType.findUnique({
         where: {
            idInvoiceType: JSON.parse(invoiceTypeId),
         },
      });

      if (singleInvoiceType) {
         result(null, singleInvoiceType);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found invoiceType with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

InvoiceType.getAll = async (result) => {
   try {
      const invoiceTypes = await prismaInstance.invoiceType.findMany({});
      result(null, invoiceTypes);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

InvoiceType.updateById = async (invoiceTypeId, invoiceType, result) => {
   try {
      const updateInvoiceType = await prismaInstance.invoiceType.update({
         where: { idInvoiceType: JSON.parse(invoiceTypeId) },
         data: invoiceType,
      });
      result(null, updateInvoiceType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

InvoiceType.remove = async (id, result) => {
   try {
      const deleteInvoiceType = await prismaInstance.invoiceType.delete({
         where: { idInvoiceType: JSON.parse(id) },
      });
      result(null, deleteInvoiceType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

InvoiceType.removeAll = async (result) => {
   try {
      const deleteAllInvoiceType = await prismaInstance.invoiceType.deleteMany(
         {}
      );
      result(null, deleteAllInvoiceType);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = InvoiceType;
