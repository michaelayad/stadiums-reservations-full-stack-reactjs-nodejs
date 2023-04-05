const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

const reservationModel = sequelize.define('reservation', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    day: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
})

module.exports = reservationModel;
