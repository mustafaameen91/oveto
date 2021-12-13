const {
   prismaErrorHandling,
   prismaInstance,
} = require("./../middleware/handleError.middleware.js");

const Settings = function (settings) {
   this.variable = settings.variable;
   this.value = settings.value;
};

Settings.create = async (newSettings, result) => {
   try {
      const settings = await prismaInstance.settings.create({
         data: newSettings,
      });
      result(null, settings);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Settings.findById = async (settingsId, result) => {
   try {
      const singleSettings = await prismaInstance.settings.findUnique({
         where: {
            idSettings: JSON.parse(settingsId),
         },
      });

      if (singleSettings) {
         result(null, singleSettings);
      } else {
         result({
            error: "Not Found",
            code: 404,
            errorMessage: "Not Found settings with this Id",
         });
      }
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Settings.getAll = async (result) => {
   try {
      const settingss = await prismaInstance.settings.findMany({});
      result(null, settingss);
   } catch (err) {
      console.log(prismaErrorHandling(err));
      result(prismaErrorHandling(err), null);
   }
};

Settings.updateByOldAhmed = async (settings, result) => {
   console.log(settings);
   try {
      const updateTitle = await prismaInstance.settings.update({
         where: { variable: "title" },
         data: { value: settings.title },
      });
      const updateWorkStartTime = await prismaInstance.settings.update({
         where: { variable: "workStartTime" },
         data: { value: settings.workStartTime },
      });

      const updateWorkEndTime = await prismaInstance.settings.update({
         where: { variable: "workEndTime" },
         data: { value: settings.workEndTime },
      });

      result(null, {
         updateWorkEndTime,
         updateWorkStartTime,
         updateTitle,
      });
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Settings.updateById = async (settingsId, settings, result) => {
   try {
      const updateSettings = await prismaInstance.settings.update({
         where: { idSettings: JSON.parse(settingsId) },
         data: settings,
      });
      result(null, updateSettings);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Settings.remove = async (id, result) => {
   try {
      const deleteSettings = await prismaInstance.settings.delete({
         where: { idSettings: JSON.parse(id) },
      });
      result(null, deleteSettings);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

Settings.removeAll = async (result) => {
   try {
      const deleteAllSettings = await prismaInstance.settings.deleteMany({});
      result(null, deleteAllSettings);
   } catch (error) {
      console.log(prismaErrorHandling(error));
      result(prismaErrorHandling(error), null);
   }
};

module.exports = Settings;
