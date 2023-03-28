const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");

const playerModel = sequelize.define("player", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        isEmail: true,
    },
    password: { type: DataTypes.STRING, allowNull: false },
    tel: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = playerModel;
