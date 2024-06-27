const { Supplier } = require("../models");
const { RESPONSE_CODES } = require("../helpers/constants/response_codes");
const { Op } = require('sequelize');
const SupplierService = {
  create: async (params) => {
    const existingSupplier = await Supplier.findOne({ where: params });

    if (existingSupplier) {
      throw {
        code: RESPONSE_CODES.SUPPLIER_EXISTS.CODE,
        message: RESPONSE_CODES.SUPPLIER_EXISTS.MESSAGE,
        status: 409,
        isHandled: true,
      };
    }
    return Supplier.create(params)
      .then((newSupplier) => {
        return { message: "Supplier successfully created", data: newSupplier };
      })
      .catch((error) => {
        if (error.isHandled) {
          throw error;
        }
        throw {
          code: RESPONSE_CODES.UNKNOWN.CODE,
          message: RESPONSE_CODES.UNKNOWN.MESSAGE,
          status: 500,
          error,
        };
      });
  },

  update: async (id, params) => {
    return Supplier.findByPk(id)
      .then((supplier) => {
        if (!supplier) {
          return Promise.reject({
            code: RESPONSE_CODES.SUPPLIER_NOT_FOUND.CODE,
            message: RESPONSE_CODES.SUPPLIER_NOT_FOUND.MESSAGE,
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

        return Supplier.findOne({ where: conflictQuery }).then((conflicts) => {
          if (conflicts) {
            return Promise.reject({
              code: RESPONSE_CODES.SUPPLIER_EXISTS.CODE,
              message: RESPONSE_CODES.SUPPLIER_EXISTS.MESSAGE,
              status: 409,
              isHandled: true,
            });
          }

          supplier.set(params);
          return supplier.save();
        });
      })
      .then((updatedSupplier) => {
        return {
          message: "Supplier successfully updated",
          data: updatedSupplier,
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
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        throw {
          code: RESPONSE_CODES.SUPPLIER_NOT_FOUND.CODE,
          message: RESPONSE_CODES.SUPPLIER_NOT_FOUND.MESSAGE,
          status: 404,
          isHandled: true,
        };
      }
      return supplier;
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
      const suppliers = await Supplier.findAll();
      if (suppliers.length === 0) {
        throw {
          code: RESPONSE_CODES.SUPPLIER_NOT_FOUND.CODE,
          message: RESPONSE_CODES.SUPPLIER_NOT_FOUND.MESSAGE,
          status: 404,
          isHandled: true,
        };
      }
      return suppliers;
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
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        throw {
          code: RESPONSE_CODES.SUPPLIER_NOT_FOUND.CODE,
          message: RESPONSE_CODES.SUPPLIER_NOT_FOUND.MESSAGE,
          status: 404,
          isHandled: true,
        };
      }

      await supplier.destroy();
      return { message: "Supplier successfully deleted" };
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

module.exports = SupplierService;
