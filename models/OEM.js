const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const OEM = sequelize.define('OEM', {
    origin: DataTypes.STRING,
    maker: DataTypes.STRING,
    brand: DataTypes.STRING,
    IDOEM: DataTypes.STRING,
});

module.exports = OEM;
