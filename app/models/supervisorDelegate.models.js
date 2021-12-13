const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const SupervisorDelegate = function (supervisorDelegate) {
   this.supervisorId = supervisorDelegate.supervisorId;
   this.delegateId = supervisorDelegate.delegateId;
};

SupervisorDelegate.create = async (newSupervisorDelegate, result) => {
   try {
      const supervisorDelegate = await prismaInstance.supervisorDelegate.create(
         {
            data: newSupervisorDelegate,
         }
      );
      result(null, supervisorDelegate);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SupervisorDelegate.findById = async (supervisorDelegateId, result) => {
   try {
      const singleSupervisorDelegate =
         await prismaInstance.supervisorDelegate.findUnique({
            where: {
               idSupervisorDelegate: JSON.parse(supervisorDelegateId),
            },
         });

      if (singleSupervisorDelegate) {
         result(null, singleSupervisorDelegate);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found supervisorDelegate with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SupervisorDelegate.findByNeglected = async (delegateId, date, result) => {
   try {
      const singleSupervisorDelegate =
         await prismaInstance.supervisorDelegate.findMany({
            where: {
               delegateId: JSON.parse(delegateId),
            },
            include: {
               delegate: {
                  include: {
                     customer: {
                        where: {
                           OR: [
                              {
                                 visitDay: date,
                              },
                              {
                                 secondVisitDay: date,
                              },
                           ],
                        },
                        include: {
                           invoice: true,
                           visit: true,
                        },
                     },
                  },
               },
            },
         });

      if (singleSupervisorDelegate.length > 0) {
         let filteredDelegates = singleSupervisorDelegate.filter((dele) => {
            if (
               dele.delegate.customer.visit == null &&
               dele.delegate.customer.invoice == null
            ) {
               return dele;
            }
         });
         result(null, filteredDelegates);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found supervisorDelegate with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SupervisorDelegate.findByQuery = async (supervisorId, date, result) => {
   try {
      const supervisorDelegates =
         await prismaInstance.$queryRaw`SELECT *, (SELECT username FROM user WHERE idUser = supervisorDelegates.delegateId) As delegateName , (SELECT @totalInvoices := COUNT(idInvoice) FROM invoice WHERE createdBy = supervisorDelegates.delegateId AND DATE(createdAt) = '${date}') As totalInvoicesToday, (SELECT @totalVisits := COUNT(idVisit) FROM visit WHERE createdBy = supervisorDelegates.delegateId AND DATE(createdAt) = '${date}') As totalVisitsToday, (SELECT @totalCustomerToCheck := COUNT(idCustomer) FROM customer WHERE createdBy = supervisorDelegates.delegateId AND (visitDay = LOWER(DAYNAME('${date}')) || secondVisitDay = LOWER(DAYNAME('${date}')))) As totalCustomersToCheck, (@totalCustomerToCheck - @totalInvoices - @totalVisits) As ramainingCustomers, (SELECT @totalBills := IFNULL(sum(total),0) FROM invoiceContent JOIN invoice ON invoiceContent.invoiceId = invoice.idInvoice WHERE invoice.createdBy = supervisorDelegates.delegateId AND invoice.invoiceTypeId = 1 AND DATE(invoice.createdAt) = '${date}') As totalBills,(SELECT @totalRestoreBills := IFNULL(sum(total),0) FROM invoiceContent JOIN invoice ON invoiceContent.invoiceId = invoice.idInvoice WHERE invoice.createdBy = supervisorDelegates.delegateId AND invoice.invoiceTypeId = 3 AND DATE(invoice.createdAt) = '${date}') As totalRestoreBills  FROM supervisorDelegates WHERE supervisorId = ${supervisorId} ORDER BY @totalBills ASC`;
      result(null, supervisorDelegates);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};
SupervisorDelegate.getAll = async (result) => {
   try {
      const supervisorDelegates =
         await prismaInstance.supervisorDelegate.findMany({});
      result(null, supervisorDelegates);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

SupervisorDelegate.updateById = async (
   supervisorDelegateId,
   supervisorDelegate,
   result
) => {
   try {
      const updateSupervisorDelegate =
         await prismaInstance.supervisorDelegate.update({
            where: { idSupervisorDelegate: JSON.parse(supervisorDelegateId) },
            data: supervisorDelegate,
         });
      result(null, updateSupervisorDelegate);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

SupervisorDelegate.remove = async (id, result) => {
   try {
      const deleteSupervisorDelegate =
         await prismaInstance.supervisorDelegate.delete({
            where: { idSupervisorDelegate: JSON.parse(id) },
         });
      result(null, deleteSupervisorDelegate);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

SupervisorDelegate.removeAll = async (result) => {
   try {
      const deleteAllSupervisorDelegate =
         await prismaInstance.supervisorDelegate.deleteMany({});
      result(null, deleteAllSupervisorDelegate);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = SupervisorDelegate;
