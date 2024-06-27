const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  

const VehicleModel = sequelize.define('VehicleModel', {
    modelName: DataTypes.STRING,
    type: DataTypes.STRING,
    propulsion: DataTypes.STRING,
    propulsionType: DataTypes.STRING,
    productionCountry: DataTypes.STRING,
    modelYear: DataTypes.INTEGER,
    productionRegion: DataTypes.STRING
});

module.exports = VehicleModel;
