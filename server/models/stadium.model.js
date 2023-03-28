const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

const stadiumModel = sequelize.define('stadium', {
    
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.TEXT, allowNull: false },
    hourPrice: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },

})

module.exports = stadiumModel;
