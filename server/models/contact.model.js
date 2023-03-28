const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database.js');

const contactModel = sequelize.define('contact', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
    },
    description: { type: DataTypes.TEXT, allowNull: false },


})

module.exports = contactModel;
