const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const InvoiceContent = function (invoiceContent) {
   this.invoiceId = invoiceContent.invoiceId;
   this.itemId = invoiceContent.itemId;
   this.count = invoiceContent.count;
   this.discount = invoiceContent.discount;
   this.discountTypeId = invoiceContent.discountTypeId;
   this.price = invoiceContent.price;
   this.total = invoiceContent.total;
};

InvoiceContent.create = async (newInvoiceContent, result) => {
   try {
      const invoiceContent = await prismaInstance.invoiceContent.create({
         data: newInvoiceContent,
      });
      result(null, invoiceContent);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

InvoiceContent.findById = async (invoiceContentId, result) => {
   try {
      const singleInvoiceContent =
         await prismaInstance.invoiceContent.findUnique({
            where: {
               idInvoiceContent: JSON.parse(invoiceContentId),
            },
         });

      if (singleInvoiceContent) {
         result(null, singleInvoiceContent);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found invoiceContent with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

InvoiceContent.getAll = async (result) => {
   try {
      const invoiceContents = await prismaInstance.invoiceContent.findMany({});
      result(null, invoiceContents);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

InvoiceContent.updateByDelivery = async (
   invoiceContentId,
   invoiceContent,
   result
) => {
   try {
      const updateInvoiceContent = await prismaInstance.invoice.update({
         where: { idInvoice: { in: JSON.parse(invoiceContentId) } },
         data: invoiceContent,
      });
      result(null, updateInvoiceContent);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

InvoiceContent.updateByDelegate = async (
   invoiceContentId,
   invoiceContent,
   result
) => {
   try {
      const updateInvoiceContent = await prismaInstance.invoice.update({
         where: { idInvoice: { in: JSON.parse(invoiceContentId) } },
         data: invoiceContent,
      });
      result(null, updateInvoiceContent);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

InvoiceContent.updateById = async (
   invoiceContentId,
   invoiceContent,
   result
) => {
   try {
      const updateInvoiceContent = await prismaInstance.invoiceContent.update({
         where: { idInvoiceContent: JSON.parse(invoiceContentId) },
         data: invoiceContent,
      });
      result(null, updateInvoiceContent);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

InvoiceContent.remove = async (id, result) => {
   try {
      const deleteInvoiceContent = await prismaInstance.invoiceContent.delete({
         where: { idInvoiceContent: JSON.parse(id) },
      });
      result(null, deleteInvoiceContent);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

InvoiceContent.removeAll = async (result) => {
   try {
      const deleteAllInvoiceContent =
         await prismaInstance.invoiceContent.deleteMany({});
      result(null, deleteAllInvoiceContent);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = InvoiceContent;
