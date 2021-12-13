const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Role = function (role) {
   this.roleName = role.roleName;
};

Role.create = async (newRole, result) => {
   try {
      const role = await prismaInstance.role.create({
         data: newRole,
      });
      result(null, role);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Role.findById = async (roleId, result) => {
   try {
      const singleRole = await prismaInstance.role.findUnique({
         where: {
            idRole: JSON.parse(roleId),
         },
      });

      if (singleRole) {
         result(null, singleRole);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found role with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Role.findByUsersRole = async (roleId, result) => {
   try {
      const roles = await prismaInstance.role.findMany({
         where: {
            idRole: JSON.parse(roleId),
         },
         include: {
            user: true,
         },
      });

      if (roles) {
         let formattedUser = roles[0].user.map((user) => {
            return {
               idUser: user.idUser,
               username: user.username,
               password: "******",
               phone: user.phone,
               email: user.email,
               createdAt: new Date(user.createdAt).toLocaleDateString(),
               roleId: user.roleId,
               idRole: roles[0].idRole,
               roleName: roles[0].roleName,
            };
         });
         result(null, formattedUser);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found role with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Role.getAll = async (result) => {
   try {
      const roles = await prismaInstance.role.findMany({});
      result(null, roles);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Role.updateById = async (roleId, role, result) => {
   try {
      const updateRole = await prismaInstance.role.update({
         where: { idRole: JSON.parse(roleId) },
         data: role,
      });
      result(null, updateRole);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Role.remove = async (id, result) => {
   try {
      const deleteRole = await prismaInstance.role.delete({
         where: { idRole: JSON.parse(id) },
      });
      result(null, deleteRole);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Role.removeAll = async (result) => {
   try {
      const deleteAllRole = await prismaInstance.role.deleteMany({});
      result(null, deleteAllRole);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Role;
