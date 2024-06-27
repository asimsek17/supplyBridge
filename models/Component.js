const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Component = sequelize.define('Component', {
    level0: DataTypes.STRING,
    level1: DataTypes.STRING,
    categoryL2: DataTypes.STRING,
    productL3: DataTypes.STRING,
    detailsL4: DataTypes.STRING
});

module.exports = Component;
