const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const RolePermissions = function (rolePermissions) {
   this.roleId = rolePermissions.roleId;
   this.permissionId = rolePermissions.permissionId;
};

RolePermissions.create = async (newRolePermissions, result) => {
   try {
      const rolePermissions = await prismaInstance.rolePermissions.create({
         data: newRolePermissions,
      });
      result(null, rolePermissions);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

RolePermissions.createByRoles = async (newRolePermissions, result) => {
   try {
      if (newRolePermissions.value == true) {
         let permissionData = {
            roleId: newRolePermissions.roleId,
            permissionId: newRolePermissions.permissionId,
         };
         const rolePermissions = await prismaInstance.rolePermissions.create({
            data: permissionData,
         });
         result(null, rolePermissions);
      } else {
         const rolePermissions = await prismaInstance.rolePermissions.delete({
            where: {
               roleId_permissionId: {
                  roleId: newRolePermissions.roleId,
                  permissionId: newRolePermissions.permissionId,
               },
            },
         });
         result(null, rolePermissions);
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

RolePermissions.findByRoleId = async (rolePermissionsId, result) => {
   try {
      const singleRolePermissions =
         await prismaInstance.rolePermissions.findMany({
            where: {
               roleId: JSON.parse(rolePermissionsId),
            },
            include: {
               permission: true,
            },
         });

      if (singleRolePermissions) {
         let formattedPermissions = singleRolePermissions.map(
            (rolePermissions) => {
               return {
                  idRolePermissions: rolePermissions.idRolePermissions,
                  roleId: rolePermissions.roleId,
                  permissionId: rolePermissions.permissionId,
                  idPermission: rolePermissions.permission.idPermission,
                  permissionName: rolePermissions.permission.permissionName,
                  permissionKey: rolePermissions.permission.permissionKey,
               };
            }
         );
         result(null, formattedPermissions);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found rolePermissions with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

RolePermissions.findById = async (rolePermissionsId, result) => {
   try {
      const singleRolePermissions =
         await prismaInstance.rolePermissions.findUnique({
            where: {
               idRolePermissions: JSON.parse(rolePermissionsId),
            },
         });

      if (singleRolePermissions) {
         result(null, singleRolePermissions);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found rolePermissions with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

RolePermissions.getAllWithRoles = async (result) => {
   try {
      const rolePermissions = await prismaInstance.rolePermissions.findMany({
         include: {
            permission: true,
            role: true,
         },
      });

      let formattedPermissions = rolePermissions.map((rolePermissions) => {
         return {
            idRolePermissions: rolePermissions.idRolePermissions,
            roleId: rolePermissions.roleId,
            permissionId: rolePermissions.permissionId,
            idPermission: rolePermissions.permission.idPermission,
            permissionName: rolePermissions.permission.permissionName,
            permissionKey: rolePermissions.permission.permissionKey,
         };
      });
      result(null, formattedPermissions);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

RolePermissions.getAll = async (result) => {
   try {
      const rolePermissions = await prismaInstance.rolePermissions.findMany({});
      result(null, rolePermissions);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

RolePermissions.updateById = async (
   rolePermissionsId,
   rolePermissions,
   result
) => {
   try {
      const updateRolePermissions = await prismaInstance.rolePermissions.update(
         {
            where: { idRolePermissions: JSON.parse(rolePermissionsId) },
            data: rolePermissions,
         }
      );
      result(null, updateRolePermissions);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

RolePermissions.remove = async (id, result) => {
   try {
      const deleteRolePermissions = await prismaInstance.rolePermissions.delete(
         {
            where: { idRolePermissions: JSON.parse(id) },
         }
      );
      result(null, deleteRolePermissions);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

RolePermissions.removeAll = async (result) => {
   try {
      const deleteAllRolePermissions =
         await prismaInstance.rolePermissions.deleteMany({});
      result(null, deleteAllRolePermissions);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = RolePermissions;
