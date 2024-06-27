const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  

const Supplier = sequelize.define('Supplier', {
    shortName: DataTypes.STRING,
    longName: DataTypes.STRING
});

module.exports = Supplier;
