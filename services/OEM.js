const { OEM } = require("../models");
const { RESPONSE_CODES } = require("../helpers/constants/response_codes");
const { Op } = require('sequelize');
const OEMService = {
  create: async (params) => {
    const existingOEM = await OEM.findOne({ where: params });

    if (existingOEM) {
      throw {
        code: RESPONSE_CODES.OEM_EXISTS.CODE,
        message: RESPONSE_CODES.OEM_EXISTS.MESSAGE,
        isHandled: true,
        status: 409,
      };
    }
    return OEM.create(params)
      .then((newOEM) => {
        return { message: "OEM successfully created", data: newOEM };
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

  // Update an existing OEM
  update: async (id, params) => {
    return OEM.findByPk(id)
      .then((oem) => {
        if (!oem) {
          return Promise.reject({
            code: RESPONSE_CODES.OEM_NOT_FOUND.CODE,
            message: RESPONSE_CODES.OEM_NOT_FOUND.MESSAGE,
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

        return OEM.findOne({ where: conflictQuery }).then((conflicts) => {
          if (conflicts) {
            return Promise.reject({
              code: RESPONSE_CODES.OEM_EXISTS.CODE,
              message: RESPONSE_CODES.OEM_EXISTS.MESSAGE,
              isHandled: true,
              status: 409,
            });
          }

          oem.set(params);
          return oem.save();
        });
      })
      .then((updatedOEM) => {
        return {
          message: "OEM successfully updated",
          data: updatedOEM,
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
      const oem = await OEM.findByPk(id);
      if (!oem) {
        throw {
          code: RESPONSE_CODES.OEM_NOT_FOUND.CODE,
          message: RESPONSE_CODES.OEM_NOT_FOUND.MESSAGE,
          isHandled: true,
          status: 404
        };
      }
      return oem;
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
      const oems = await OEM.findAll();
      if (oems.length === 0) {
        throw {
          code: RESPONSE_CODES.OEM_NOT_FOUND.CODE,
          message: RESPONSE_CODES.OEM_NOT_FOUND.MESSAGE,
          status: 404,
          isHandled: true,
        };
      }
      return oems;
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
      const oem = await OEM.findByPk(id);
      if (!oem) {
        throw {
          code: RESPONSE_CODES.OEM_NOT_FOUND.CODE,
          message: RESPONSE_CODES.OEM_NOT_FOUND.MESSAGE,
          status: 404,
          isHandled: true,
        };
      }

      await oem.destroy();
      return { message: "OEM successfully deleted" };
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

module.exports = OEMService;
