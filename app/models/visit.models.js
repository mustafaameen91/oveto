const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Visit = function (visit) {
   this.createdBy = visit.createdBy;
   this.customerId = visit.customerId;
   this.visitCauseId = visit.visitCauseId;
   this.longitude = visit.longitude;
   this.latitude = visit.latitude;
};

Visit.create = async (newVisit, result) => {
   try {
      const visit = await prismaInstance.visit.create({
         data: newVisit,
      });
      result(null, visit);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Visit.findById = async (visitId, result) => {
   try {
      const singleVisit = await prismaInstance.visit.findUnique({
         where: {
            idVisit: JSON.parse(visitId),
         },
      });

      if (singleVisit) {
         result(null, singleVisit);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found visit with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Visit.getAllByDate = async (userId, date, result) => {
   try {
      const visits = await prismaInstance.visit.findMany({
         where: {
            createdBy: JSON.parse(userId),
            customer: {
               createdAt: date,
            },
         },
         include: {
            user: true,
            customer: true,
            visitCause: true,
         },
      });

      let formattedVisits = visits.map((visit) => {
         return {
            createdBy: visit.createdBy,
            createdAt: `${new Date(
               visit.createdAt
            ).toLocaleDateString()} ${new Date(
               visit.createdAt
            ).toLocaleTimeString()}`,
            customerId: visit.customerId,
            visitCauseId: visit.visitCauseId,
            longitude: visit.longitude,
            latitude: visit.latitude,
            username: visit.user.username,
            storeName: visit.customer.storeName,
            visitCauseName: visit.visitCause.visitCauseName,
         };
      });
      result(null, formattedVisits);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Visit.getAll = async (result) => {
   try {
      const visits = await prismaInstance.visit.findMany({
         include: {
            user: true,
            customer: true,
            visitCause: true,
         },
      });

      let formattedVisits = visits.map((visit) => {
         return {
            createdBy: visit.createdBy,
            createdAt: `${new Date(
               visit.createdAt
            ).toLocaleDateString()} ${new Date(
               visit.createdAt
            ).toLocaleTimeString()}`,
            customerId: visit.customerId,
            visitCauseId: visit.visitCauseId,
            longitude: visit.longitude,
            latitude: visit.latitude,
            username: visit.user.username,
            storeName: visit.customer.storeName,
            visitCauseName: visit.visitCause.visitCauseName,
         };
      });
      result(null, formattedVisits);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Visit.updateById = async (visitId, visit, result) => {
   try {
      const updateVisit = await prismaInstance.visit.update({
         where: { idVisit: JSON.parse(visitId) },
         data: visit,
      });
      result(null, updateVisit);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Visit.remove = async (id, result) => {
   try {
      const deleteVisit = await prismaInstance.visit.delete({
         where: { idVisit: JSON.parse(id) },
      });
      result(null, deleteVisit);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Visit.removeAll = async (result) => {
   try {
      const deleteAllVisit = await prismaInstance.visit.deleteMany({});
      result(null, deleteAllVisit);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Visit;
