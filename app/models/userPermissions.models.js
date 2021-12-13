const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const UserPermissions = function (userPermissions) {
   this.userId = userPermissions.userId;
   this.permissionId = userPermissions.permissionId;
};

UserPermissions.create = async (newUserPermissions, result) => {
   try {
      const userPermissions = await prismaInstance.userPermissions.create({
         data: newUserPermissions,
      });
      result(null, userPermissions);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

UserPermissions.findById = async (userPermissionsId, result) => {
   try {
      const singleUserPermissions =
         await prismaInstance.userPermissions.findUnique({
            where: {
               idUserPermissions: JSON.parse(userPermissionsId),
            },
         });

      if (singleUserPermissions) {
         result(null, singleUserPermissions);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found userPermissions with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

UserPermissions.getAll = async (result) => {
   try {
      const userPermissionss = await prismaInstance.userPermissions.findMany(
         {}
      );
      result(null, userPermissionss);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

UserPermissions.updateById = async (
   userPermissionsId,
   userPermissions,
   result
) => {
   try {
      const updateUserPermissions = await prismaInstance.userPermissions.update(
         {
            where: { idUserPermissions: JSON.parse(userPermissionsId) },
            data: userPermissions,
         }
      );
      result(null, updateUserPermissions);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

UserPermissions.remove = async (id, result) => {
   try {
      const deleteUserPermissions = await prismaInstance.userPermissions.delete(
         {
            where: { idUserPermissions: JSON.parse(id) },
         }
      );
      result(null, deleteUserPermissions);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

UserPermissions.removeAll = async (result) => {
   try {
      const deleteAllUserPermissions =
         await prismaInstance.userPermissions.deleteMany({});
      result(null, deleteAllUserPermissions);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = UserPermissions;
