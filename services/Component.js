const { RESPONSE_CODES } = require("../helpers/constants/response_codes");
const { Component, Supplier, VehicleModel } = require("../models");
const { Op } = require('sequelize');
const ComponentService = {
  create: async (params) => {
    const existingComponent = await Component.findOne({ where: params });

    if (existingComponent) {
      throw {
        code: RESPONSE_CODES.COMPONENT_EXISTS.CODE,
        message: RESPONSE_CODES.COMPONENT_EXISTS.MESSAGE,
        isHandled: true,
        status: 409,
      };
    }

    const promises = [
      VehicleModel.findByPk(params.modelId),
      Supplier.findByPk(params.supplierId),
    ];

    return Promise.all(promises)
      .then((results) => {
        if (!results[0]) {
          throw {
            code: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.CODE,
            message: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.MESSAGE,
            isHandled: true,
            status: 404,
          };
        }
        if (!results[1]) {
          throw {
            code: RESPONSE_CODES.SUPPLIER_NOT_FOUND.CODE,
            message: RESPONSE_CODES.SUPPLIER_NOT_FOUND.MESSAGE,
            isHandled: true,
            status: 404,
          };
        }

        return Component.create(params);
      })
      .then((newComponent) => {
        return {
          message: "Component successfully created",
          data: newComponent,
        };
      })
      .catch((error) => {
        if (error.isHandled) {
          throw error;
        }
        throw {
          code: RESPONSE_CODES.UNKNOWN.CODE,
          message: RESPONSE_CODES.UNKNOWN.MESSAGE,
          status: 500,
          error
        };
      });
  },

  update: async (id, params) => {
    return Component.findByPk(id)
      .then((component) => {
        if (!component) {
          return Promise.reject({
            code: RESPONSE_CODES.COMPONENT_NOT_FOUND.CODE,
            message: RESPONSE_CODES.COMPONENT_NOT_FOUND.MESSAGE,
            isHandled: true,
            status: 404,
          });
        }

        const conflictQuery = {
          [Op.and]: [
            ...Object.entries(params).map(([key, value]) => ({ [key]: value })),
            { id: { [Op.ne]: id } } 
          ]
        };

        return Component.findOne({ where: conflictQuery }).then((conflicts) => {
          if (conflicts) {
            return Promise.reject({
              code: RESPONSE_CODES.COMPONENT_EXISTS.CODE,
              message: RESPONSE_CODES.COMPONENT_EXISTS.MESSAGE,
              isHandled: true,
              status: 409,
            });
          }

          const promises = [];
          if (params.modelId) {
            promises.push(VehicleModel.findByPk(params.modelId));
          }
          if (params.supplierId) {
            promises.push(Supplier.findByPk(params.supplierId));
          }

          return Promise.all(promises).then((results) => {
            if (params.modelId && !results[0]) {
              return Promise.reject({
                code: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.CODE,
                message: RESPONSE_CODES.VEHICLE_MODEL_NOT_FOUND.MESSAGE,
                isHandled: true,
                status: 404,
              });
            }
            if (params.supplierId && !results[1]) {
              return Promise.reject({
                code: RESPONSE_CODES.SUPPLIER_NOT_FOUND.CODE,
                message: RESPONSE_CODES.SUPPLIER_NOT_FOUND.MESSAGE,
                isHandled: true,
                status: 404,
              });
            }

            component.set(params);
            return component.save();
          });
        });
      })
      .then((updatedComponent) => {
        return {
          message: "Component successfully updated",
          data: updatedComponent,
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
      const component = await Component.findByPk(id);
      if (!component)
        throw {
          code: RESPONSE_CODES.COMPONENT_NOT_FOUND.CODE,
          message: RESPONSE_CODES.COMPONENT_NOT_FOUND.MESSAGE,
          isHandled: true,
          status: 404,
        };
      return component;
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
      const components = await Component.findAll();
      if (components.length === 0) {
        throw {
          code: RESPONSE_CODES.COMPONENT_NOT_FOUND.CODE,
          message: RESPONSE_CODES.COMPONENT_NOT_FOUND.MESSAGE,
          isHandled: true,
          status: 404,
        };
      }
      return components;
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
      const component = await Component.findByPk(id);
      if (!component)
        throw {
          code: RESPONSE_CODES.COMPONENT_NOT_FOUND.CODE,
          message: RESPONSE_CODES.COMPONENT_NOT_FOUND.MESSAGE,
          isHandled: true,
          status: 404,
        };

      await component.destroy();
      return { message: "Component successfully deleted" };
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

module.exports = ComponentService;
