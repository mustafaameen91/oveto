const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const VisitCause = function (visitCause) {
   this.visitCauseName = visitCause.visitCauseName;
};

VisitCause.create = async (newVisitCause, result) => {
   try {
      const visitCause = await prismaInstance.visitCause.create({
         data: newVisitCause,
      });
      result(null, visitCause);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

VisitCause.findById = async (visitCauseId, result) => {
   try {
      const singleVisitCause = await prismaInstance.visitCause.findUnique({
         where: {
            idVisitCause: JSON.parse(visitCauseId),
         },
      });

      if (singleVisitCause) {
         result(null, singleVisitCause);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found visitCause with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

VisitCause.getAll = async (result) => {
   try {
      const visitCauses = await prismaInstance.visitCause.findMany({});
      result(null, visitCauses);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

VisitCause.updateById = async (visitCauseId, visitCause, result) => {
   try {
      const updateVisitCause = await prismaInstance.visitCause.update({
         where: { idVisitCause: JSON.parse(visitCauseId) },
         data: visitCause,
      });
      result(null, updateVisitCause);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

VisitCause.remove = async (id, result) => {
   try {
      const deleteVisitCause = await prismaInstance.visitCause.delete({
         where: { idVisitCause: JSON.parse(id) },
      });
      result(null, deleteVisitCause);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

VisitCause.removeAll = async (result) => {
   try {
      const deleteAllVisitCause = await prismaInstance.visitCause.deleteMany(
         {}
      );
      result(null, deleteAllVisitCause);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = VisitCause;
