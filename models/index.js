const sequelize = require('../config/database'); 
const OEM = require('./OEM');
const VehicleModel = require('./VehicleModel');
const Supplier = require('./Supplier');
const Component = require('./Component');
const User = require('./User');

OEM.hasMany(VehicleModel, { foreignKey: 'oemId' });
VehicleModel.belongsTo(OEM, { foreignKey: 'oemId' });

VehicleModel.hasMany(Component, { foreignKey: 'modelId' });
Component.belongsTo(VehicleModel, { foreignKey: 'modelId' });

Supplier.hasMany(Component, { foreignKey: 'supplierId' });
Component.belongsTo(Supplier, { foreignKey: 'supplierId' });

module.exports = {
    OEM,
    VehicleModel,
    Supplier,
    Component,
    User,
    sequelize
};
