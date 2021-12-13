const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Permission = function (permission) {
   this.permissionName = permission.permissionName;
   this.permissionKey = permission.permissionKey;
};

Permission.create = async (newPermission, result) => {
   try {
      const permission = await prismaInstance.permission.create({
         data: newPermission,
      });
      result(null, permission);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Permission.findById = async (permissionId, result) => {
   try {
      const singlePermission = await prismaInstance.permission.findUnique({
         where: {
            idPermission: JSON.parse(permissionId),
         },
      });

      if (singlePermission) {
         result(null, singlePermission);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found permission with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Permission.getAllWithRole = async (result) => {
   try {
      const permissions = await prismaInstance.permission.findMany({});
      result(null, permissions);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Permission.getAll = async (result) => {
   try {
      const permissions = await prismaInstance.permission.findMany({});
      result(null, permissions);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Permission.updateById = async (permissionId, permission, result) => {
   try {
      const updatePermission = await prismaInstance.permission.update({
         where: { idPermission: JSON.parse(permissionId) },
         data: permission,
      });
      result(null, updatePermission);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Permission.remove = async (id, result) => {
   try {
      const deletePermission = await prismaInstance.permission.delete({
         where: { idPermission: JSON.parse(id) },
      });
      result(null, deletePermission);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Permission.removeAll = async (result) => {
   try {
      const deleteAllPermission = await prismaInstance.permission.deleteMany(
         {}
      );
      result(null, deleteAllPermission);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Permission;
