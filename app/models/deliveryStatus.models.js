const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const DeliveryStatus = function (deliveryStatus) {
   this.deliveryId = deliveryStatus.deliveryStatusname;
   this.invoiceId = deliveryStatus.invoiceId;
   this.startedAt = deliveryStatus.startedAt;
   this.deliveredAt = deliveryStatus.deliveredAt;
   this.notice = deliveryStatus.notice;
};

DeliveryStatus.create = async (newDeliveryStatus, result) => {
   try {
      const deliveryStatus = await prismaInstance.deliveryStatus.create({
         data: newDeliveryStatus,
      });
      result(null, deliveryStatus);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

DeliveryStatus.findById = async (deliveryStatusId, result) => {
   try {
      const singleDeliveryStatus =
         await prismaInstance.deliveryStatus.findUnique({
            where: {
               idDeliveryStatus: JSON.parse(deliveryStatusId),
            },
         });

      if (singleDeliveryStatus) {
         result(null, singleDeliveryStatus);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found deliveryStatus with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

DeliveryStatus.getAll = async (result) => {
   try {
      const deliveryStatuss = await prismaInstance.deliveryStatus.findMany({});
      result(null, deliveryStatuss);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

DeliveryStatus.updateById = async (
   deliveryStatusId,
   deliveryStatus,
   result
) => {
   try {
      const updateDeliveryStatus = await prismaInstance.deliveryStatus.update({
         where: { idDeliveryStatus: JSON.parse(deliveryStatusId) },
         data: deliveryStatus,
      });
      result(null, updateDeliveryStatus);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

DeliveryStatus.remove = async (id, result) => {
   try {
      const deleteDeliveryStatus = await prismaInstance.deliveryStatus.delete({
         where: { idDeliveryStatus: JSON.parse(id) },
      });
      result(null, deleteDeliveryStatus);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

DeliveryStatus.removeAll = async (result) => {
   try {
      const deleteAllDeliveryStatus =
         await prismaInstance.deliveryStatus.deleteMany({});
      result(null, deleteAllDeliveryStatus);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = DeliveryStatus;
