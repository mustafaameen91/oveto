const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const User = function (user) {
   this.username = user.username;
   this.password = user.password;
   this.roleId = user.roleId;
   this.phone = user.phone;
   this.email = user.email;
};

User.create = async (newUser, result) => {
   try {
      const user = await prismaInstance.user.create({
         data: newUser,
      });
      result(null, user);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

User.findById = async (userId, result) => {
   try {
      const singleUser = await prismaInstance.user.findUnique({
         where: {
            idUser: JSON.parse(userId),
         },
         include: {
            role: {
               include: {
                  rolePermissions: { include: { permission: true } },
               },
            },
         },
      });

      if (singleUser) {
         let formattedUser = {
            idUser: singleUser.idUser,
            username: singleUser.username,
            password: "******",
            phone: singleUser.phone,
            email: singleUser.email,
            createdAt: new Date(singleUser.createdAt).toLocaleDateString(),
            roleId: singleUser.roleId,
            roleName: singleUser.role.roleName,
            permissions: singleUser.role.rolePermissions.map((per) => {
               return { permissionKey: per.permission.permissionKey };
            }),
         };
         result(null, formattedUser);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found user with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

User.loginUser = async (user, result) => {
   try {
      const singleUser = await prismaInstance.user.findMany({
         where: {
            AND: [{ username: user.username, password: user.password }],
         },
         include: {
            role: {
               include: {
                  rolePermissions: { include: { permission: true } },
               },
            },
         },
      });

      if (singleUser.length > 0) {
         let formattedUser = {
            idUser: singleUser[0].idUser,
            username: singleUser[0].username,
            password: "********",
            phone: singleUser[0].phone,
            email: singleUser[0].email,
            createdAt: new Date(singleUser[0].createdAt).toLocaleDateString(),
            roleId: singleUser[0].roleId,
            roleName: singleUser[0].role.roleName,
            permissions: singleUser[0].role.rolePermissions.map((per) => {
               return { permissionKey: per.permission.permissionKey };
            }),
         };
         result(null, formattedUser);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found user with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

User.getAll = async (result) => {
   try {
      const users = await prismaInstance.user.findMany({
         include: { role: true },
      });
      let formattedUser = users.map((user) => {
         return {
            idUser: user.idUser,
            username: user.username,
            password: "******",
            phone: user.phone,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleDateString(),
            roleId: user.roleId,
            idRole: user.role.idRole,
            roleName: user.role.roleName,
         };
      });
      result(null, formattedUser);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

User.updateById = async (userId, user, result) => {
   try {
      const updateUser = await prismaInstance.user.update({
         where: { idUser: JSON.parse(userId) },
         data: user,
      });
      result(null, updateUser);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

User.remove = async (id, result) => {
   try {
      const deleteUser = await prismaInstance.user.delete({
         where: { idUser: JSON.parse(id) },
      });
      result(null, deleteUser);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

User.removeAll = async (result) => {
   try {
      const deleteAllUser = await prismaInstance.user.deleteMany({});
      result(null, deleteAllUser);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = User;
