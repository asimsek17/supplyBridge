const { VehicleModel, OEM } = require("../models");
const { RESPONSE_CODES } = require("../helpers/constants/response_codes");
const { Op } = require("sequelize");

const VehicleModelService = {
  create: async (params) => {
    const existingVehicleModel = await VehicleModel.findOne({ where: params });

    if (existingVehicleModel) {
      throw {
        code: RESPONSE_CODES.VEHICLE_MODEL_EXISTS.CODE,
        message: RESPONSE_CODES.VEHICLE_MODEL_EXISTS.MESSAGE,
        status: 409,
        isHandled: true,
      };
    }
    const oem = await OEM.findByPk(params.oemId);
    if (!oem) {
      throw {
        code: RESPONSE_CODES.OEM_NOT_FOUND.CODE,
        message: RESPONSE_CODES.OEM_NOT_FOUND.MESSAGE,
        status: 404,
        isHandled: true,
      };
    }

    return VehicleModel.create(params)
      .then((newVehicleModel) => {
        return {
          message: "Vehicle Model successfully created",
          data: newVehicleModel,
        };
      })
      .catch((error) => {
        throw {
          code: RESPONSE_CODES.UNKNOWN.CODE,
          message: RESPONSE_CODES.UNKNOWN.MESSAGE,
          status: 500,
          error,
        };
      });
  },
  update: async (id, params) => {
    return VehicleModel.findByPk(id)
      .then((vehicleModel) => {
        if (!vehicleModel) {
          return Promise.reject({
            code: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.CODE,
            message: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.MESSAGE,
            status: 404,
            isHandled: true,
          });
        }

        const conflictQuery = {
          [Op.and]: [
            ...Object.entries(params).map(([key, value]) => ({ [key]: value })),
            { id: { [Op.ne]: id } },
          ],
        };

        return VehicleModel.findOne({ where: conflictQuery }).then(
          (conflicts) => {
            if (conflicts) {
              return Promise.reject({
                code: RESPONSE_CODES.VEHICLE_MODEL_EXISTS.CODE,
                message: RESPONSE_CODES.VEHICLE_MODEL_EXISTS.MESSAGE,
                status: 409,
                isHandled: true,
              });
            }

            return OEM.findByPk(params.oemId).then((oem) => {
              if (!oem) {
                return Promise.reject({
                  code: RESPONSE_CODES.OEM_NOT_FOUND.CODE,
                  message: RESPONSE_CODES.OEM_NOT_FOUND.MESSAGE,
                  status: 404,
                  isHandled: true,
                });
              }

              vehicleModel.set(params);
              return vehicleModel.save();
            });
          }
        );
      })
      .then((updatedVehicleModel) => {
        return {
          message: "VehicleModel successfully updated",
          data: updatedVehicleModel,
        };
      })
      .catch((error) => {
        if (error.isHandled) {
          return Promise.reject(error);
        }
        return Promise.reject({
          code: RESPONSE_CODES.UNKNOWN.CODE,
          message: RESPONSE_CODES.UNKNOWN.MESSAGE,
          status: 500,
          error,
        });
      });
  },

  get: async (id) => {
    try {
      const vehicleModel = await VehicleModel.findByPk(id);
      if (!vehicleModel) {
        throw {
          code: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.CODE,
          message: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.MESSAGE,
          status: 404,
          isHandled: true,
        };
      }
      return vehicleModel;
    } catch (error) {
      if (error?.isHandled) {
        throw error;
      }
      throw {
        code: RESPONSE_CODES.UNKNOWN.CODE,
        message: RESPONSE_CODES.UNKNOWN.MESSAGE,
        status: 500,
        error,
      };
    }
  },

  list: async () => {
    try {
      const vehicleModels = await VehicleModel.findAll();
      if (vehicleModels.length === 0) {
        throw {
          code: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.CODE,
          message: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.MESSAGE,
          status: 404,
          isHandled: true,
        };
      }
      return vehicleModels;
    } catch (error) {
      if (error?.isHandled) {
        throw error;
      }
      throw {
        code: RESPONSE_CODES.UNKNOWN.CODE,
        message: RESPONSE_CODES.UNKNOWN.MESSAGE,
        status: 500,
        error,
      };
    }
  },

  delete: async (id) => {
    try {
      const vehicleModel = await VehicleModel.findByPk(id);
      if (!vehicleModel) {
        throw {
          code: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.CODE,
          message: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.MESSAGE,
          status: 404,
          isHandled: true,
        };
      }

      await vehicleModel.destroy();
      return { message: "Vehicle Model successfully deleted" };
    } catch (error) {
      if (error?.isHandled) {
        throw error;
      }
      throw {
        code: RESPONSE_CODES.UNKNOWN.CODE,
        message: RESPONSE_CODES.UNKNOWN.MESSAGE,
        status: 500,
        error,
      };
    }
  },
};

module.exports = VehicleModelService;
