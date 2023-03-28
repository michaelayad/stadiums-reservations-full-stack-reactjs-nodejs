const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

const availableHourModel = sequelize.define('availableHour', {
    day: {
        type: DataTypes.DATEONLY,
        primaryKey: true,
        allowNull: false
    },
    hour: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    stadiumId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "stadia",
            key: "id"
        },
        onDelete: "CASCADE"
    },

})

module.exports = availableHourModel;