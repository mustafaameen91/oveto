const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Invoice = function (invoice) {
   this.invoiceTypeId = invoice.invoiceTypeId;
   this.customerId = invoice.customerId;
   this.createdBy = invoice.createdBy;
   this.notice = invoice.notice;
   this.sellPriceId = invoice.sellPriceId;
   this.sellTypeId = invoice.sellTypeId;
   this.deliveryId = invoice.deliveryId;
};

Invoice.create = async (newInvoice, result) => {
   try {
      const invoice = await prismaInstance.invoice.create({
         include: {
            invoiceContent: true,
         },
         data: {
            ...newInvoice.invoice,
            invoiceContent: {
               create: newInvoice.invoiceContents,
            },
         },
      });
      result(null, invoice);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Invoice.findByIdFilter = async (filter, conditions, result) => {
   try {
      const singleInvoice = await prismaInstance.invoice.findMany({
         where: {
            ...conditions,
         },
         ...filter,
         include: {
            invoiceType: true,
            sellPrice: true,
            customer: true,
            delivery: true,
            user: true,
         },
      });

      if (singleInvoice.length > 0) {
         result(null, singleInvoice);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found invoice with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Invoice.findById = async (invoiceId, result) => {
   try {
      const singleInvoice = await prismaInstance.invoice.findUnique({
         where: {
            idInvoice: JSON.parse(invoiceId),
         },
      });

      if (singleInvoice) {
         result(null, singleInvoice);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found invoice with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Invoice.getAll = async (result) => {
   try {
      const invoices = await prismaInstance.invoice.findMany({});
      result(null, invoices);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Invoice.findByIdWithQuery = async (invoiceId, result) => {
   try {
      const updateInvoice =
         await prismaInstance.$queryRaw`SELECT *,(SELECT customerName FROM customer WHERE idCustomer = invoice.customerId) As customerName, (SELECT username FROM user WHERE idUser = invoice.createdBy) As createdByName, (SELECT username FROM user WHERE idUser = invoice.deliveryId) As deliveryName, (SELECT COALESCE(SUM(total),0) FROM invoiceContent WHERE invoiceId = invoice.idInvoice) As totalPrice, (SELECT COUNT(*) FROM invoiceContent WHERE invoiceId = invoice.idInvoice) As totalItems, DATE_FORMAT(createdAt, '%Y-%m-%d') As creationFixedDate, DATE_FORMAT(createdAt, '%T') As creationFixedTime, DATE_FORMAT(createdAt, '%W') As creationDayName FROM invoice JOIN invoiceType ON invoice.invoiceTypeId = invoiceType.idInvoiceType WHERE idInvoice IN (${invoiceId})`;
      result(null, updateInvoice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Invoice.findByIdWithPostQuery = async (invoiceId, result) => {
   try {
      const updateInvoice =
         await prismaInstance.$queryRaw`SELECT *, (SELECT GROUP_CONCAT(json_object('itemId',itemId,'discount',discount,'discountTypeId',discountTypeId,'count',count,'price',price,'total',total,'discountName',(SELECT discountName FROM discount WHERE idDiscount = invoiceContent.discountTypeId LIMIT 1),'itemName',(SELECT itemName FROM item WHERE idItem = invoiceContent.itemId LIMIT 1))) FROM invoiceContent WHERE invoice.idInvoice = invoiceContent.invoiceId) As items , (SELECT customerName FROM customer WHERE idCustomer = invoice.customerId) As customerName,(SELECT phone FROM customer WHERE idCustomer = invoice.customerId) As customerPhone,(SELECT address FROM customer WHERE idCustomer = invoice.customerId) As customerAddress, (SELECT username FROM user WHERE idUser = invoice.createdBy) As createdByName, (SELECT username FROM user WHERE idUser = invoice.deliveryId) As deliveryName, (SELECT COALESCE(SUM(total),0) FROM invoiceContent WHERE invoiceId = invoice.idInvoice) As totalPrice, (SELECT COUNT(*) FROM invoiceContent WHERE invoiceId = invoice.idInvoice) As totalItems, DATE_FORMAT(createdAt, '%Y-%m-%d') As creationFixedDate, DATE_FORMAT(createdAt, '%T') As creationFixedTime, DATE_FORMAT(createdAt, '%W') As creationDayName FROM invoice JOIN invoiceType ON invoice.invoiceTypeId = invoiceType.idInvoiceType WHERE idInvoice IN (${invoiceId})`;
      result(null, updateInvoice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Invoice.updateById = async (invoiceId, invoice, result) => {
   try {
      const updateInvoice = await prismaInstance.invoice.update({
         where: { idInvoice: JSON.parse(invoiceId) },
         data: invoice,
      });
      result(null, updateInvoice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Invoice.removeMultiple = async (id, result) => {
   try {
      const deleteInvoice = await prismaInstance.invoice.delete({
         where: { idInvoice: { in: JSON.parse(id) } },
      });

      const deleteInvoiceContent = await prismaInstance.invoiceContent.delete({
         where: { invoiceId: { in: JSON.parse(id) } },
      });
      console.log(deleteInvoiceContent);
      result(null, deleteInvoice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Invoice.remove = async (id, result) => {
   try {
      const deleteInvoice = await prismaInstance.invoice.delete({
         where: { idInvoice: JSON.parse(id) },
      });
      result(null, deleteInvoice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Invoice.removeAll = async (result) => {
   try {
      const deleteAllInvoice = await prismaInstance.invoice.deleteMany({});
      result(null, deleteAllInvoice);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Invoice;
